import React, {useReducer, useCallback, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {Engine} from './engine';

import * as plugins from './plugins';

const engine = new Engine();

Object.values(plugins).map(plugin => engine.enablePlugin(new plugin()));

const built = engine.build();

export function Browser() {
  const browserRef = useRef(null);

  const [state, dispatch] = useReducer(built.reducer, built.initialState);

  const onMessage = useCallback(built.onMessage(state, dispatch, browserRef), [
    state,
    dispatch,
  ]);

  const onLoadEnd = useCallback(built.onLoadEnd(state, dispatch, browserRef), [
    state,
    dispatch,
  ]);

  const onLoadStart = useCallback(
    built.onLoadStart(state, dispatch, browserRef),
    [state, dispatch],
  );

  console.log('STATE', state);

  return (
    <>
      {built.headerComponent.map((Component: any) => (
        <Component state={state} dispatch={dispatch} browserRef={browserRef} />
      ))}

      <WebView
        ref={browserRef}
        style={{flexGrow: 1}}
        source={{uri: state.browser.url}}
        onMessage={onMessage}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        ref={browserRef}
      />

      {built.footerComponent.map((Component: any) => (
        <Component state={state} dispatch={dispatch} browserRef={browserRef} />
      ))}

      {built.genericComponent.map((Component: any) => (
        <Component state={state} dispatch={dispatch} browserRef={browserRef} />
      ))}
    </>
  );
}
