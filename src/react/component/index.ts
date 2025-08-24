/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

import { Ibdd_in, ITestAdapter } from "Testeranto/src/CoreTypes";

export type I = Ibdd_in<
  typeof React.Component,
  React.CElement<any, any>,
  React.CElement<any, any>,
  React.CElement<any, any>,
  unknown,
  () => (s: React.CElement<any, any>) => any,
  unknown
>;

export const reactInterfacer = (
  testInput: I["iinput"]
): ITestAdapter<I> => {
  return {
    beforeEach: async () => {
      return new Promise((resolve, rej) => {
        resolve(React.createElement(testInput, {}, []));
      });
    },
    andWhen: function (s, whenCB) {
      return whenCB()(s);
    },
  };
};
