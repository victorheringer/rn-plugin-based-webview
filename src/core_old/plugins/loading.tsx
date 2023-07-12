import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {BrowserPlugin} from '../plugin';
import {ACTIONS} from '../actions';

export class LoadingPlugin implements BrowserPlugin<any, any> {
  initialState = {loading: {visible: false}};

  onLoadStart({dispatch}: any) {
    dispatch({type: ACTIONS.LOADING.SET_LOADING, payload: true});
  }

  onLoadEnd({dispatch}: any) {
    dispatch({type: ACTIONS.LOADING.SET_LOADING, payload: false});
  }

  reducer(state: any, action: any) {
    switch (action.type) {
      case ACTIONS.LOADING.SET_LOADING: {
        return {...state, loading: {...state.loading, visible: action.payload}};
      }
      default:
        return state;
    }
  }

  headerComponent({state}: any) {
    return (
      <View style={{justifyContent: 'center'}}>
        {state.loading.visible && <ActivityIndicator />}
      </View>
    );
  }
}
