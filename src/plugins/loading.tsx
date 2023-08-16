import {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {PluginsContext} from '../lib/PluginsContext';

const loadingInitialState = {loading: {visible: false}};

function loadingReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_LOADING': {
      return {...state, loading: {...state.loading, visible: action.payload}};
    }
    default:
      return state;
  }
}

function LoadingComponent() {
  const {state, refs, dispatch, middlewares} = useContext(PluginsContext);

  return (
    <View style={{justifyContent: 'center'}}>
      {state.loading.visible && <ActivityIndicator />}
    </View>
  );
}

const loadingMiddlewares = {
  ON_LOAD_END: [
    ({state, action, dispatch}) =>
      params => {
        dispatch({type: 'SET_LOADING', payload: false});
      },
  ],
  ON_LOAD_START: [
    ({state, action, dispatch}) =>
      params => {
        dispatch({type: 'SET_LOADING', payload: true});
      },
  ],
};

export const LoadingPlugin = {
  reducers: loadingReducer,
  state: loadingInitialState,
  Component: LoadingComponent,
  middlewares: loadingMiddlewares,
};
