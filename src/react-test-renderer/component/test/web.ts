import test from "../web";

import { IProps, IState } from "../../../mocks/mockReactComponent";

import { implementation, O, specification, subject } from ".";

export default test<O, IProps, IState>(
  implementation,
  specification,
  subject
);
