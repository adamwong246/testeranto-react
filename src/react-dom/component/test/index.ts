/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  ITestImplementation,
} from "testeranto/src/CoreTypes";
// import { act } from "react";
import assert from "assert";
import MockComponent, {
  IProps,
  IState,
  O,
} from "../../../mocks/mockReactComponent";
import { I } from "../dynamic";

type M = {};

// export const implementation: ITestImplementation<I, O, M> = {
//   suites: {
//     Default: "default",
//   },
//   givens: {
//     AnEmptyState: (): IProps => {
//       return { foo: "bar", children: [] };
//     },
//   },
//   whens: {
//     IClickTheButton: () => async (component) => {
//       const button = component.htmlElement.querySelector('#theButton');
//       if (!button) {
//         throw new Error('Button not found');
//       }
//       await act(async () => {
//         button.click();
//         // Wait for React updates to complete
//         await new Promise(resolve => setTimeout(resolve, 0));
//       });
//       return component;
//     },
//     IClickTheHeader: () => async (component) => {
//       const header = component.htmlElement.querySelector('#theHeader');
//       await act(() => {
//         header?.click();
//       });
//       return component;
//     },
//   },
//   thens: {
//     ThePropsIs: (expectation: IProps) => async (store, pm) => {
      
//       console.log("mark55")
//       const p = await pm.page();
      
      
//       console.log("mark6", p)
//       debugger
//       await pm.customScreenShot([{ path: "foo/pleaseWork.png" }, p])

//       // console.log('Checking props...', JSON.stringify(store));
//       // await act(async () => {
//       //   await new Promise(resolve => setTimeout(resolve, 100));
//       // });
      
//       const propsElement = store.htmlElement.querySelector('#theProps');
//       if (!propsElement) {
//         // console.error('Props element not found in:', component.htmlElement.innerHTML);
//         throw new Error('Could not find props element');
//       }
//       try {
//         const actualProps = JSON.parse(propsElement.textContent || '{}');
//         assert.deepEqual(actualProps, expectation);
//         // console.log('Props match:', actualProps);
//       } catch (e) {
//         // console.error('Props mismatch:', JSON.stringify(e));
//         throw new Error(`Expected props ${JSON.stringify(expectation)} but got ${propsElement.textContent}`);
//       }
//       return component;
//     },
//     TheStatusIs: (expectation: IState) => (store) => {
//       console.log('Checking state...', store.htmlElement.innerHTML);
//       const stateElement = store.htmlElement.querySelector('#theStat');
//       if (!stateElement) {
//         console.error('State element not found in:', component.htmlElement.innerHTML);
//         throw new Error('Could not find state element');
//       }
//       try {
//         const actualState = JSON.parse(stateElement.textContent || '{}');
//         assert.deepEqual(actualState, expectation);
//         console.log('State matches:', actualState);
//       } catch (e) {
//         console.error('State mismatch:', e);
//         throw new Error(`Expected state ${JSON.stringify(expectation)} but got ${stateElement.textContent}`);
//       }
//       return component;
//     },
//   },
// };


export const subject = MockComponent;
