import {useContext} from 'react';
import {WebView} from 'react-native-webview';

import {PluginsContext} from '../lib/PluginsContext';

function BrowserPluginComponent() {
  const {state, ref, dispatch, middlewares} = useContext(PluginsContext);

  return (
    <WebView
      ref={ref}
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

const browserMiddleware = {
  ON_LOAD_END: [
    ({state, action, dispatch}) =>
      params => {
        console.log(state);
      },
  ],
  ON_LOAD_START: [],
};

export const BrowserPlugin = {
  reducers: browserReducer,
  state: browserInitialState,
  effects: browserEffects,
  Component: BrowserPluginComponent,
};
