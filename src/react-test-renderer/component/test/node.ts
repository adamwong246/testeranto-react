import test from "../node";

// import { O } from "../";
import { IProps, IState } from "../../../mocks/mockReactComponent";
import component from "../../../mocks/mockReactComponent";
// import { specification } from "../../../../examples/react/component/test";

import { testImplementation } from "./implementation";

export default test<O, IProps, IState>(
  testImplementation,
  specification,
  component
);
