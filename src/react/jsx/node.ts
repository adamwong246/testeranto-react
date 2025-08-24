/* eslint-disable @typescript-eslint/no-empty-object-type */
import Testeranto from "testeranto/src/Node";
import {
  ITestAdapter,
  ITestImplementation,
  ITestSpecification,
  Ibdd_out_any,
} from "Testeranto/src/CoreTypes";

import { testInterface as baseInterface, I } from "./index.js";

export default <O extends Ibdd_out_any, M = {}>(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: I["iinput"],
  testInterface: ITestAdapter<I> = baseInterface
) => {
  return Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
};
