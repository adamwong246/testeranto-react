import Testeranto from "testeranto/src/Node";

import { ITestImplementation, ITestSpecification, OT } from "../../../Types";

import { I, testInterface } from "./static.js";

export default <O extends OT, M>(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: I["iinput"]
) => {
  return Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
};
