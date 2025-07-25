/* eslint-disable @typescript-eslint/no-unused-vars */
import Testeranto from "testeranto/src/Web";
import {
  Ibdd_out,
  ITestAdapter,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/CoreTypes";

import { adapter, I, IInput } from "./dynamic.js";

import * as ReactDOM from 'react-dom/client';
import { O } from "../../mocks/mockReactComponent.js";
import { assert } from "chai";


// export const adapter: ITestAdapter<I> = {
//   afterEach: async function (store: IStore, ndx, artificer, utils) {
//     utils.writeFileSync("aftereachlog", store.toString());

//     //   const page = (await utils.browser.pages()).filter((x) => {
//     //     const parsedUrl = new URL(x.url());
//     //     parsedUrl.search = "";
//     //     const strippedUrl = parsedUrl.toString();

//     //     return (
//     //       strippedUrl ===
//     //       "file:///Users/adam/Code/kokomoBay/docs/web/src/ClassicalComponent/react-dom/client.web.test.html"
//     //     );
//     //     // return true;
//     //   })[0];

//     //   await page.screenshot({
//     //     path: "screenshot.jpg",
//     //   });

//     //   return store;
//   },
// };

// const adapter: ITestAdapter<I> = {
//   beforeEach: async (subject, initializer, testResource, initialValues, pm) => {
//     console.log('beforeEach - initializing test');
//     return initializer();
//   },
//   andWhen: async (store, whenCB, testResource, pm) => {
//     console.log('andWhen - executing action!');
//     return whenCB(store, pm);
//   },
//   butThen: async (store, thenCB, testResource, pm) => {
//     if (!store.domRoot) throw "butThen: omroot should exist"
//     console.log('butThen - ');
//     return thenCB(store, pm);
//   },
//   afterEach: async (store, key, pm) => {
//     console.log('afterEach - cleaning up', JSON.stringify(store));

//     if (!store.domRoot) throw "afterEach: omroot should exist"

//     await act(() => {
//       store.domRoot.unmount();
//     });
//     return store;
//   },
//   afterAll: () => {
//     console.log('afterAll - test complete');
//   },
//   assertThis: (x) => {
//     console.log('assertThis - verifying result', x);
//     if (x instanceof Error) {
//       throw x;
//     }
//     return x;
//   },
//   beforeAll: async (input, testResource, pm) => {
//     console.log('beforeAll - mounting component', input.toString());
//     const domRoot = document.createElement('div');
//     domRoot.id = 'root';
//     document.body.appendChild(domRoot);
    
//     console.log('Creating React root...');
//     const root = ReactDOM.createRoot(domRoot);
//     console.log('Creating React element...');
//     const reactElement = React.createElement(input, {});
//     console.log('Rendering element...');
//     await act(() => {
//       root.render(reactElement);
//     });
//     console.log('Component mounted successfully');
    
//     return {
//       domRoot: root,
//       htmlElement: domRoot,
//       reactElement
//     };
//   }
// };

// import { I, IInput } from "./dynamic.js";


export default <O extends Ibdd_out, M>(
  testImplementations: ITestImplementation<I, O, M>,
  testSpecifications: ITestSpecification<I, O>,
  testInput: IInput
) => {
  const t = Testeranto<I, O, M>(
    testInput,
    testSpecifications,
    testImplementations,
    // adapter
    adapter(testInput)
  );

  // document.addEventListener("DOMContentLoaded", function () {
  //   const elem = document.getElementById("root");
  //   if (elem) {
  //     return t;
  //   }
  // });

  return t;
};
