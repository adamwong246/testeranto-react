import Testeranto from "testeranto/src/Pure";
import { ITestImplementation, ITestSpecification, Ibdd_out } from "testeranto/src/CoreTypes.js";

import { I, testInterfacer } from "./static.js";

export default <O extends Ibdd_out, M>(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: I["iinput"]
) => {
  return Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterfacer(testInput)
  );
};
