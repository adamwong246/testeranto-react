import assert from "assert";
import { ITestImplementation } from "testeranto/src/CoreTypes";
import { O } from "../../../mocks/mockReactComponent";
import { I } from "../dynamic";

export const implementation: ITestImplementation<I, O> = {
  suites: {
    Default: "Classical Component, react-dom, client.web",
  },
  givens: {
    AnEmptyState: () => ({ 
      props: { foo: "bar" },
      state: { count: 0 } // Initial state should be 0 since button increments it
    }),
  },
  whens: {
    IClickTheHeader:
      () =>
      async ({ htmlElement }, tr, pm) => {
        // debugger
        const p = await pm.page();
        await pm.customScreenShot({ path: "IClickTheHeader.png" }, p);
        htmlElement.querySelector("#theHeader").click();
      },
    IClickTheButton:
      () =>
      async ({ htmlElement }, tr, pm) => {
        // debugger
        const p = await pm.page();
        await pm.customScreenShot({ path: "IClickTheButton.png" }, p);
        htmlElement.querySelector("#theButton").click();
      },
  },
  thens: {
    ThePropsIs:
      (expectation) =>
      async ({ htmlElement, reactElement }, pm) => {
        try {
          const p = await pm.page();
          await pm.customScreenShot({ path: "props.png" }, p);

          const elem = htmlElement.querySelector("#theProps");
          if (!elem) throw new Error("#theProps element not found");

          const found = elem.innerHTML;
          console.log("Props content:", found);

          const parsed = JSON.parse(found);
          console.log("Parsed props:", parsed);

          // Extract just the props from the component's output
          const actualProps = parsed.props || parsed;
          assert.deepEqual(actualProps, expectation);
        } catch (err) {
          console.error("Props assertion failed:", err.toString());
          throw err;
        }
      },

    TheStatusIs:
      (expectation) =>
      async ({ htmlElement }, pm) => {
        try {
          const p = await pm.page();
          await pm.customScreenShot({ path: "status.png" }, p);

          const elem = htmlElement.querySelector("#theStat");
          if (!elem) throw new Error("#theStat element not found");

          const found = elem.innerHTML;
          console.log("Status content:", found);

          const parsed = JSON.parse(found);
          console.log("Parsed status:", parsed);

          // Compare the actual state object
          assert.deepEqual(parsed, expectation);
        } catch (err) {
          console.error("Status assertion failed:", err.toString());
          throw err;
        }
      },
  },
  checks: {
    AnEmptyState: () => () => {
      return {};
    },
  },
};
