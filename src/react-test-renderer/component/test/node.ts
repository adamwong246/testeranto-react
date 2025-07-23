import test from "../node";
import { IProps, IState } from "../../../mocks/mockReactComponent";

import { subject, implementation, specification } from ".";

export default test<IProps, IState, O>(
  implementation,
  specification,
  subject
);
