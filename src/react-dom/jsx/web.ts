import Testeranto from "testeranto/src/Web";
import { ITestImplementation, ITestSpecification, Ibdd_out } from "testeranto/src/CoreTypes";

import type { IInput } from "./index";
import { I, adapter } from "./dynamic.js";

export default <O extends Ibdd_out, M>(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: IInput
) => {
  const t = Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    adapter(testInput)
  );

  // document.addEventListener("DOMContentLoaded", function () {
  //   const rootElement = document.getElementById("root");
  //   // if (rootElement) {
  //   // }
  // });

  return t;
};
