import test from "../pure";

import { IProps, IState, O, specification, subject } from "../../../mocks/mockReactComponent";

import { implementation } from ".";

export default test<IProps, IState, O>(
  implementation,
  specification,
  subject
);
