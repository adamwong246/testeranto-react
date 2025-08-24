/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";

import ReactDom from "react-dom/client";

import { Ibdd_in, ITestAdapter } from "testeranto/src/CoreTypes";

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

export const adapter: (testInput: IInput) => ITestAdapter<I> = (testInput) => {
  
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
      console.log("BEFORE ALL");
      // debugger
      try {
        let htmlElement = document.getElementById("root");
        if (!htmlElement) {
          htmlElement = document.createElement("div");
          htmlElement.id = "root";
          document.body.appendChild(htmlElement);
          console.log("Created root element");
        }

        
        return { htmlElement };
      } catch (err) {
        // console.error("beforeAll failed:", err);
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

      const { htmlElement } = subject;

      const domRoot = ReactDom.createRoot(htmlElement);

      
      return new Promise((resolve, rej) => {
        try {
          const initValues = initializer();
          
          const element = React.createElement(
            TesterantoComponent,
            {
              ...initValues,
              subject: testInput,
              done: (reactElement) => {

                resolve({
                  htmlElement,
                  reactElement,
                  domRoot
                });
              },
            },
            []
          );

          domRoot.render(element);
        } catch (err) {
          rej(err);
        }
      });
    },
    andWhen: async function (s, whenCB, tr, pm) {
      console.log("andWhen");
      return whenCB(s,
        tr, pm
      );
    },
    butThen: async function (s, thenCB) {
      console.log("butThen");
      return thenCB(s);
    },
    afterEach: async function (store, ndx, utils) {
      console.log("afterEach");
      // debugger
      store.domRoot.unmount();
      // ReactDom.unmountComponentAtNode(document.getElementById('root'));
      // ReactDom.

      // try {
      //   // if (store?.domRoot) {
      //   //   await act(() => {
      //   //     store.domRoot.unmount();
      //   //   });
      //   // }
      //   return store;
      // } catch (err) {
      //   console.error("Error in afterEach:", err.toString());
      //   return store;
      // }
      return store;
    },

    afterAll: async (store, utils) => {
      console.log("afterAll");
      if (store?.htmlElement) {
        store.htmlElement.remove();
      }
      // debugger
      return store;
    },
    assertThis: (x) => {
      // if (x instanceof Error) {
      //   throw x;
      // }
      return x;
    },
  };
};
