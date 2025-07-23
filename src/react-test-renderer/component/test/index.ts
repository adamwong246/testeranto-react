import {
  Ibdd_out,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/CoreTypes";
import { act } from "react-test-renderer";

import assert from "assert";
import MockComponent, {
  IProps,
  IState,
} from "../../../mocks/mockReactComponent";

type M = {};

export const implementation: ITestImplementation<I, O, M> = {
  suites: {
    Default: "default",
  },
  givens: {
    AnEmptyState: (): IProps => {
      return { foo: "bar", children: [] };
    },
  },
  whens: {
    IClickTheButton: () => async (component) => {
      const button = component.root.findByProps({ id: "theButton" });
      await button.props.onClick();
      return component;
    },
    IClickTheHeader: () => async (component) => {
      try {
        const header = component.root.findByProps({ id: "theHeader" });
        await header.props.onClick();
      } catch (error) {
        // Expected error - header is not clickable
      }
      return component;
    },
  },
  thens: {
    ThePropsIs: (expectation: IProps) => (component) => {
      const propsElement = component.root.findByProps({ id: "theProps" });
      const actualProps = JSON.parse(propsElement.props.children);
      assert.deepEqual(
        actualProps,
        expectation,
        `Expected props ${JSON.stringify(expectation)} but got ${
          propsElement.props.children
        }`
      );
      return component;
    },
    TheStatusIs: (expectation: IState) => (component) => {
      const stateElement = component.root.findByProps({ id: "theStat" });
      const actualState = JSON.parse(stateElement.props.children);
      assert.deepEqual(
        actualState,
        expectation,
        `Expected state ${JSON.stringify(expectation)} but got ${
          stateElement.props.children
        }`
      );
      return component;
    },
  },
  checks: {
    AnEmptyState: (): IProps => {
      return { foo: "bar", children: [] };
    },
  },
};

export type O = Ibdd_out<
  { Default: [string] }, // suites
  { AnEmptyState: [] }, // givens
  { IClickTheButton: []; IClickTheHeader: [] }, // whens
  {
    ThePropsIs: [any];
    TheStatusIs: [any];
  }
>;

export const specification: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then
) => [
  Suite.Default("Testing ClassicalComponent", {
    "initial state": Given.AnEmptyState(
      ["Component should initialize with correct state"],
      [],
      [
        Then.ThePropsIs({ foo: "bar", children: [] }),
        Then.TheStatusIs({ count: 0 }),
      ]
    ),
    "button click": Given.AnEmptyState(
      ["Clicking button should increment count"],
      [When.IClickTheButton()],
      [Then.TheStatusIs({ count: 1 })]
    ),
    "header click": Given.AnEmptyState(
      ["Clicking header should not change state"],
      [When.IClickTheHeader()],
      [Then.TheStatusIs({ count: 0 })]
    ),
  }),
];

export const subject = MockComponent;
