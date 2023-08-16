import {useContext} from 'react';
import {WebView} from 'react-native-webview';

import {PluginsContext} from '../lib/PluginsContext';

function BrowserPluginComponent() {
  const {state, refs, dispatch, middlewares} = useContext(PluginsContext);

  console.log(state);

  return (
    <WebView
      ref={el => (refs.current.browser = el)}
      source={{uri: state.browser.url}}
      style={{flexGrow: 1}}
    />
  );
}

const browserInitialState = {
  browser: {
    url: 'https://reactnative.dev/',
    history: [],
    loading: false,
    data: null,
    error: null,
  },
};

const propToMiddlewareMap = {
  browser: {
    onLoadEnd: 'ON_LOAD_END',
    onLoadStart: 'ON_LOAD_START',
  },
};

function browserReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_URL': {
      return {
        ...state,
        browser: {
          ...state.browser,
          url: action.payload,
          history: [...state.browser.history, action.payload],
        },
      };
    }
    case 'REQUEST_LOADING': {
      return {
        ...state,
        browser: {
          ...state.browser,
          loading: true,
          error: false,
        },
      };
    }
    case 'REQUEST_DATA': {
      return {
        ...state,
        browser: {
          ...state.browser,
          loading: false,
          data: action.payload,
          error: false,
        },
      };
    }
    case 'REQUEST_ERROR': {
      return {
        ...state,
        browser: {
          ...state.browser,
          loading: false,
          error: true,
        },
      };
    }
    default:
      return state;
  }
}

const browserEffects = {
  CREATE_BROWSER_CONFIG_EFFECT: async ({state, action, dispatch}) => {
    try {
      dispatch({type: 'REQUEST_LOADING'});
      const response = await fetch(action.payload);
      const json = await response.json();
      dispatch({type: 'REQUEST_DATA', payload: json.movies});
    } catch (error) {
      dispatch({type: 'REQUEST_ERROR'});
    }
  },
};

const browserRef = {browser: null};

export const BrowserPlugin = {
  reducers: browserReducer,
  state: browserInitialState,
  effects: browserEffects,
  Component: BrowserPluginComponent,
  refs: browserRef,
};
