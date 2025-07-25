import { IProps, IState, O, specification, subject } from "../../../mocks/mockReactComponent";

import test from "../node";


import { implementation } from ".";

export default test<IProps, IState, O>(
  implementation,
  specification,
  subject
);
