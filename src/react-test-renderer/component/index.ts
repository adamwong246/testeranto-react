import ReactTestRenderer from "react-test-renderer";
import React from "react";
import { Ibdd_in, ITestAdapter } from "testeranto/src/CoreTypes";

export const adapter: ITestAdapter<I> = {
  assertThis: (x) => x,
  beforeEach: async function (
    CComponent,
    propsAndChildren: () => any
  ): Promise<ReactTestRenderer> {
    function Link(proper) {
      return React.createElement(CComponent, proper(), []);
    }
    return ReactTestRenderer.create(Link(propsAndChildren));
  },
  andWhen: async function (
    renderer: ReactTestRenderer,
    whenCB: any
  ): Promise<ReactTestRenderer> {
    await whenCB(renderer);
    return renderer;
  },
  butThen: async function (s, thenCB, tr) {
    return thenCB(s);
  },
  afterEach: async function (store, ndx, artificer) {
    return {};
  },
  afterAll: (store, artificer) => {
    return;
  },
};

export type IInput<P, S> = new (props: P) => React.Component<P, S>;

export type I = Ibdd_in<
  IInput<any, any>, // iinput
  ReactTestRenderer, // isubject
  ReactTestRenderer, // istore
  ReactTestRenderer, // iselection
  unknown, // given
  unknown, // when
  unknown // then
>;
