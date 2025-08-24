import test from "Testeranto/src/Pure";
import {
  Ibdd_out,
  ITestImplementation,
  ITestSpecification,
} from "Testeranto/src/CoreTypes.js";

import { I, IInput, testInterface } from "./index.js";

export default <
  II extends I,
  O extends Ibdd_out<
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>,
    Record<string, any>
  >
>(
  testImplementations: ITestImplementation<II, O>,
  testSpecifications: ITestSpecification<II, O>,
  testInput: IInput,
  testInterface2 = testInterface
) => {
  return test<I, O>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface2
  );
};
