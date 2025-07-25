import { IProps, O, specification } from "../../../mocks/mockReactComponent";

import test from "../web";

import { subject } from ".";
import { implementation } from "./implementation";

export default test<O, IProps>(
  implementation,
  specification,
  subject
);
