/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
// import {render} from "react-dom/client"
import ReactDom from "react-dom/client";

import { Ibdd_in, ITestAdapter } from "testeranto/src/CoreTypes";
// import { act } from "react";

export type IInput = typeof React.Component;

export type ISelection = {
  htmlElement: HTMLElement;
  reactElement: React.ReactElement;
  domRoot: ReactDom.Root;
};

export type IStore = ISelection;

export type ISubject = {
  htmlElement: HTMLElement;
  domRoot: ReactDom.Root;
};

export type I = Ibdd_in<
  IInput,
  ISubject,
  ISelection,
  IStore,
  (s: IStore) => IStore,
  (s: IStore) => IStore,
  (s: IStore) => IStore
>;

export const adapter: (
  testInput: IInput
) => ITestAdapter<I> = (testInput) => {

  class TesterantoComponent extends React.Component {
    done: (t: TesterantoComponent) => void;
    constructor(props) {
      super(props);
      this.done = props.done;
    }
    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
      return this.done(this);
    }

    render() {
      return React.createElement(this.props.subject, this.props);
    }
  }

  return {
    beforeAll: async (subject, artificer) => {
      console.log('beforeAll - setting up test environment');
      try {
        let htmlElement = document.getElementById("root");
        if (!htmlElement) {
          htmlElement = document.createElement('div');
          htmlElement.id = 'root';
          document.body.appendChild(htmlElement);
          console.log('Created root element');
        }
        
        const domRoot = ReactDom.createRoot(htmlElement);
        console.log('Created React root');
        return { domRoot, htmlElement };
      } catch (err) {
        console.error('beforeAll failed:', err);
        throw err;
      }
    },
    beforeEach: async (
      subject,
      initializer,
      testResource,
      initialValues,
      pm
    ) => {
      const { domRoot, htmlElement } = subject;
      console.log('beforeEach - initializing with:', {initialValues, subject});
      console.log('beforeEach - initializing test with values:', initialValues);
      try {
        return await new Promise((resolve, rej) => {
          const element = React.createElement(
            TesterantoComponent,
            {
              ...initialValues,
              subject: testInput,
              done: (reactElement) => {
                console.log('Component mounted successfully');
                resolve({
                  htmlElement,
                  reactElement,
                  domRoot,
                });
              },
            },
            []
          );
          
          console.log('Rendering test component...');
          domRoot.render(element);
        });
      } catch (err) {
        console.error('beforeEach failed:', JSON.stringify(err));
        throw err;
      }
    },
    andWhen: async function (s, whenCB) {
      console.log("andWhen")
      return whenCB(s);
    },
    butThen: async function (s, thenCB) {
      console.log("butThen")
      return thenCB(s);
    },
    afterEach: async function (store, ndx, utils) {
      console.log("afterEach")
      try {
        // if (store?.domRoot) {
        //   await act(() => {
        //     store.domRoot.unmount();
        //   });
        // }
        return store;
      } catch (err) {
        console.error('Error in afterEach:', err.toString());
        return store;
      }
    },

    afterAll: async (store, utils) => {
      console.log("afterAll")
      if (store?.htmlElement) {
        store.htmlElement.remove();
      }
      
      return store;
    },
    assertThis: (x) => {
      if (x instanceof Error) {
        throw x;
      }
      return x;
    }
  };
};
