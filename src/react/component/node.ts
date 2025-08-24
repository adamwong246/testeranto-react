import Testeranto from "testeranto/src/Node";
import { ITestImplementation, ITestSpecification, Ibdd_out_any } from "Testeranto/src/CoreTypes";

import { reactInterfacer, I } from "./index.js";

export default <O extends Ibdd_out_any, M>(
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
