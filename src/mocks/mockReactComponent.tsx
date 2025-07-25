/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Ibdd_out, ITestSpecification } from "testeranto/src/CoreTypes";

import { I } from "../react/component";

export type IProps = { foo: string, children: [] };
export type IState = { count: number };

export class MockComponent extends React.Component<IProps, IState> {
  constructor(props) {

    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div style={{ border: '3px solid black' }}>
        <h1 id="theHeader">Hello Marcus</h1>
        <pre id="theProps">{JSON.stringify(this.props)}</pre>
        <p>foo: {this.props.foo}</p>
        <pre id="theStat">{JSON.stringify(this.state)}</pre>
        <p>count: {this.state.count} times</p>
        <button id="theButton" onClick={async () => {
          this.setState({ count: this.state.count + 1 })
        }}>
          Click
        </button>
      </div>
    );
  }
}

export default MockComponent;

export type O = Ibdd_out<
  { Default: [string] }, // suites
  { AnEmptyState: [] }, // givens
  { // whens
    IClickTheButton: [];
    IClickTheHeader: []
  },
  { // thens
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
    "initial-state": Given.AnEmptyState(  // Changed from "initial state" to "initial-state"
      ["Component should initialize with correct state"],
      [],
      [
        Then.ThePropsIs({ foo: "bar", children: [] }),
        // Then.TheStatusIs({ count: 0 }),
      ]
    ),
    // "button-click": Given.AnEmptyState(  // Changed from "button click"
    //   ["Clicking button should increment count"],
    //   [When.IClickTheButton()],
    //   [Then.TheStatusIs({ count: 1 })]
    // ),
    // "header-click": Given.AnEmptyState(  // Changed from "header click"
    //   ["Clicking header should not change state"],
    //   [When.IClickTheHeader()],
    //   [Then.TheStatusIs({ count: 0 })]
    // ),
  }),
];

export const subject = MockComponent;
