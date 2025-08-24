import { createElement } from "react";

import { Ibdd_in, ITestAdapter } from "testeranto/src/CoreTypes";
import { ITTestResourceConfiguration, IPM } from "testeranto/src/lib";

import { IInput, ISelection, IStore, IWhenShape, IThenShape } from ".";

export type ISubject = HTMLElement;

export type I = Ibdd_in<
  IInput,
  ISubject,
  IStore,
  ISelection,
  unknown,
  IWhenShape,
  IThenShape
>;

export const adapter = (
  testInput: I["iinput"]
): ITestAdapter<I> => {
  return {
    beforeAll: async (input, testResource, pm) => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      return container;
    },
    beforeEach: async (subject, initializer, testResource, initialValues, pm) => {
      const result = initializer();
      return result;
    },
    andWhen: async function (store, whenCB, testResource, pm) {
      const result = await whenCB(store, testResource, pm);
      return result(store);
    },
    butThen: async function (store, thenCB, testResource, pm) {
      const result = await thenCB(store, testResource, pm);
      return result(store);
    },
    afterEach: async function (store, key, pm) {
      if (store.container) {
        store.domRoot.unmount();
        store.container.remove();
      }
      return;
    },
    afterAll: (store, pm) => {
      return;
    },
    assertThis: (x: any) => {
      return;
    },
  };
};
