import Testeranto from "testeranto/src/Node";

import { ITestImplementation, ITestSpecification } from "testeranto/dist/types/src/CoreTypes";

import { IInput, I } from "./index.js";
import { testInterface } from "./interface.js";

export default <O extends OT, IProps, IState, M = object >(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: IInput<IProps, IState>
) =>
  Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    testInterface
  );
