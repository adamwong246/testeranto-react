import Testeranto from "testeranto/src/Pure";
import {
  Ibdd_out,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/CoreTypes";
import { I, IInput, adapter } from ".";

export default <IProps, IState, O extends Ibdd_out, M = object>(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: IInput<IProps, IState>
) =>
  Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    adapter
  );
