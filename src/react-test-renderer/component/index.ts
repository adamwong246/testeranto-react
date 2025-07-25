/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactTestRenderer, { act } from "react-test-renderer";
import React from "react";
import { Ibdd_in, ITestAdapter } from "testeranto/src/CoreTypes";

// Initialize global for React test environment
if (typeof global === 'undefined') {
  (window as any).global = window;
}
const DEBUG = false; // Disable debug logging by default

global.IS_REACT_ACT_ENVIRONMENT = true;
 
export const adapter: ITestAdapter<I> = {
  assertThis: (x) => x,
  
  beforeEach: async function (
    CComponent: IInput<any, any>,
    getProps: () => any
  ): Promise<ReactTestRenderer> {
    let renderer: ReactTestRenderer;
    try {
      const props = getProps();
      // console.log('[DEBUG] Mounting component:', CComponent.toString());
      console.log('[DEBUG] With props:', props);

      if (!CComponent || typeof CComponent !== 'function') {
        throw new Error(`Invalid component - expected React component but got: ${typeof CComponent}`);
      }

      await act(async () => {
        try {
          const element = React.createElement(CComponent, props);

          console.log("mark3", JSON.stringify(element))
          if (!element || typeof element !== 'object') {
            throw new Error(`createElement returned invalid element: ${typeof element}`);
          }
          
          renderer = ReactTestRenderer.create(element);
          // if (!renderer || !renderer.root) {
          //   const json = renderer?.toJSON();
          //   console.error('Initial render failed. JSON output:', json);
          //   throw new Error('Renderer creation failed - no root element');
          // }
        } catch (e) {
          console.error('[ERROR] Component creation failed:', {
            component: CComponent?.name,
            props,
            error: e
          });
          throw e;
        }
      });

      // Verify renderer is still mounted
      if (!renderer || !renderer.root) {
        throw new Error('Component unmounted immediately after creation');
      }

      console.log('[DEBUG] Component mounted successfully:', {
        rootType: renderer.root.type,
        children: renderer.root.children
      });
      
      return renderer;
    } catch (error) {
      console.error('Mounting error:', {
        error: error instanceof Error ? error.stack : error,
        component: CComponent?.name,
        props: getProps()
      });
      throw error;
    }
  },
  
  andWhen: async function (
    renderer: ReactTestRenderer,
    whenCB: any
  ): Promise<ReactTestRenderer> {
    try {
      if (!renderer?.root) {
        throw new Error('Renderer is not mounted before When step');
      }

      console.log('[DEBUG] Before When step:', {
        rootExists: !!renderer.root,
        tree: renderer.toJSON()
      });

      await act(async () => {
        try {
          await whenCB(renderer);
        } catch (e) {
          console.error('Error during When callback:', e);
          throw e;
        }
      });

      if (!renderer.root) {
        console.error('After When step - renderer state:', {
          mounted: !!renderer,
          rootExists: !!renderer?.root,
          lastOutput: renderer?.toJSON()
        });
        throw new Error('Renderer unmounted during When step');
      }

      return renderer;
    } catch (error) {
      console.error('Error in When step:', {
        error: error instanceof Error ? error.stack : error,
        rendererState: renderer?.toJSON()
      });
      throw error;
    }
  },

  butThen: async function (renderer, thenCB, tr) {
    try {
      if (!renderer?.root) {
        console.error('Then step - renderer state:', {
          mounted: !!renderer,
          rootExists: !!renderer?.root
        });
        throw new Error('Renderer unmounted before Then step');
      }

      console.log('[DEBUG] Before Then step:', {
        rootExists: !!renderer.root,
        tree: renderer.toJSON()
      });

      const result = await act(async () => {
        try {
          return await thenCB(renderer);
        } catch (e) {
          console.error('Error during Then callback:', e);
          throw e;
        }
      });

      if (!renderer.root) {
        throw new Error('Renderer unmounted during Then step');
      }

      return result;
    } catch (error) {
      console.error('Error in Then step:', {
        error: error instanceof Error ? error.stack : error,
        rendererState: renderer?.toJSON()
      });
      throw error;
    }
  },

  afterEach: async function (renderer, ndx, artificer) {
    try {
      if (renderer && typeof renderer.unmount === 'function') {
        await act(async () => {
          try {
            renderer.unmount();
          } catch (e) {
            console.warn('Error during unmount:', e);
          }
        });
      }
      return {};
    } catch (e) {
      console.error('Error in afterEach:', e);
      throw e;
    }
  },
  
  afterAll: () => {
    return;
  },

  beforeAll: async (s) => {
    return s;
  }
};

export type IInput<P, S> = new (props: P) => React.Component<P, S>;

export type I = Ibdd_in<
  IInput<any, any>, // iinput
  ReactTestRenderer, // isubject
  ReactTestRenderer, // istore
  ReactTestRenderer, // iselection
  unknown, // given
  unknown, // when
  unknown // then
>;
