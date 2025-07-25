/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  ITestImplementation,
} from "testeranto/src/CoreTypes";

import assert from "assert";
import {
  IProps,
  IState,
  O,
} from "../../../mocks/mockReactComponent";
import { I } from "../../../react/component";
import { act } from 'react-test-renderer';

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
      try {
        if (!component || !component.root) {
          throw new Error('Component is not mounted or has no root element');
        }

        // Debug logging removed for production
        
        const button = component.root.findByProps({ id: "theButton" });
        if (!button) {
          const buttons = component.root.findAllByType('button');
          console.error('[ERROR] Could not find button with id "theButton". Available buttons:', buttons);
          throw new Error(`Button not found. Available button IDs: ${
            buttons.map(b => b.props.id).filter(Boolean).join(', ') || 'none'}`);
        }
        if (!button.props.onClick) {
          console.error('Button props:', button.props);
          throw new Error('Button has no onClick handler');
        }
        
        await act(async () => {
          try {
            button.props.onClick();
          } catch (e) {
            console.error('Click handler error:', e);
            throw e;
          }
        });
        
        // if (DEBUG) {
        //   console.log('After click:', component.toJSON());
        //   console.log('Updated state:', component.root.findByProps({ id: "theStat" })?.props.children);
        // }
        return component;
      } catch (error) {
        console.error('Error in IClickTheButton:', error);
        throw error;
      }
    },
    IClickTheHeader: () => async (component) => {
      try {
        const header = component.root.findByProps({ id: "theHeader" });
        await act(async () => {
          try {
            if (header.props.onClick) {
              await header.props.onClick();
            }
          } catch (error) {
            // Expected error - header is not clickable
          }
        });
        return component;
      } catch (error) {
        console.error('Error in IClickTheHeader:', error);
        throw error;
      }
    },
  },
  thens: {
    ThePropsIs: (expectation: IProps) => (component) => {
      try {
        if (!component || !component.root) {
          console.error('Component state:', component);
          throw new Error('Component not mounted or invalid');
        }
        
        const propsElement = component.root.findByProps({ id: "theProps" });
        if (!propsElement) {
          console.error('Available props:', component.root.findAllByType('pre'));
          throw new Error('Could not find props element with id "theProps"');
        }
        
        const propsText = propsElement.props.children;
        if (!propsText) {
          console.error('Props element:', propsElement);
          throw new Error('Props element has no children');
        }
        
        const actualProps = JSON.parse(propsText);
        // if (DEBUG) {
        //   console.log('Props comparison:', {
        //     actual: actualProps,
        //     expected: expectation
        //   });
        // }
        assert.deepStrictEqual(actualProps, expectation);
        return component;
      } catch (e) {
        console.error('Props assertion failed:', e);
        throw new Error(`Props assertion failed: ${e.message}`);
      }
    },
    TheStatusIs: (expectation: IState) => (component) => {
      try {
        if (!component || !component.root) {
          throw new Error('Component is not mounted or has no root element');
        }

        const stateElement = component.root.findByProps({ id: "theStat" });
        if (!stateElement) {
          throw new Error('Could not find state element with id "theStat"');
        }

        const actualState = JSON.parse(stateElement.props.children);
        assert.deepEqual(actualState, expectation);
        return component;
      } catch (e) {
        console.error('State assertion failed:', e);
        throw new Error(`State assertion failed: ${e.message}`);
      }
    },
  },
};
