import Testeranto from "testeranto/src/Web";
import { ITestImplementation, ITestSpecification, Ibdd_out } from "Testeranto/src/CoreTypes";

import { reactInterfacer, I } from "./index.js";

export default <O extends Ibdd_out, M>(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: I["iinput"]
) => {
  return Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    reactInterfacer(testInput)
  );
};
