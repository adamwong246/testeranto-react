import assert from "assert";
import { ITestImplementation } from "testeranto/src/CoreTypes";
import { O } from "../../../mocks/mockReactComponent";
import { I } from "../dynamic";

export const implementation: ITestImplementation<I, O> = {
  suites: {
    Default: "Classical Component, react-dom, client.web",
  },
  givens: {
    AnEmptyState: { props: { foo: "bar" } },
  },
  whens: {
    IClickTheHeader:
      () =>
      async ({ htmlElement }) => {
        htmlElement.querySelector("#theHeader").click();
      },
    IClickTheButton:
      () =>
      async ({ htmlElement }) => {
        htmlElement.querySelector("#theButton").click();
      },
  },
  thens: {
    ThePropsIs:
      (expectation) =>
      async ({ htmlElement, reactElement }, pm) => {
        const elem = htmlElement.querySelector("#theProps");
        const found = elem.innerHTML;

        const p = await pm.page();
        console.log("mark6", p);
        await pm.customScreenShot({ path: "pleaseWork.png" }, p);

        assert.deepEqual(JSON.parse(found), expectation);
      },

    TheStatusIs:
      (expectation) =>
      async ({ htmlElement }) => {
        const elem = htmlElement.querySelector("#theStat");
        const found = elem.innerHTML;
        assert.deepEqual(found, JSON.stringify(expectation));
      },
  },
  checks: {
    AnEmptyState: () => () => {
      return {};
    },
  },
};
