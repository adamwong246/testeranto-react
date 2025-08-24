import test from "testeranto/src/Web";

import {
  Ibdd_out_any,
  ITestImplementation,
  ITestSpecification,
} from "Testeranto/src/CoreTypes.js";

import { I, IInput, testInterface } from "./index.js";

export default <
  II extends I,
  O extends Ibdd_out_any
>(
  testImplementations: ITestImplementation<II, O>,
  testSpecifications: ITestSpecification<II, O>,
  testInput: IInput,
  testInterface2 = testInterface
) => {
  return test<I, O, unknown>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface2
  );
};
