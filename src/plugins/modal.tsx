import {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';

import {PluginsContext} from '../lib/PluginsContext';

const CLOSE_TOKEN = 'close-modal';

function modalManagerReducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD_MODAL': {
      const [, ...rest] = state.modals;
      return {...state, modals: [...rest, action.payload, CLOSE_TOKEN]};
    }
    case 'CLOSE_MODAL': {
      const [current] = state.modals;
      const start = current !== CLOSE_TOKEN ? 2 : 1;
      return {...state, modals: state.modals.slice(start)};
    }
    case 'CLEAR_LIST': {
      return {...state, modals: []};
    }
    default:
      return state;
  }
}

function ModalManagerComponent() {
  const {state, refs, dispatch, middlewares} = useContext(PluginsContext);
  const [current] = state.modals;

  return (
    <View>
      <Modal isVisible={current === 'test-modal'}>
        <View style={{flex: 1, height: 200}}>
          <Pressable onPress={() => dispatch({type: 'CLOSE_MODAL'})}>
            <Text style={{backgroundColor: '#F00'}}>Close Modal</Text>
          </Pressable>
          <Text style={{backgroundColor: '#FFF'}}>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
}

const modalManagerInitialState = {modals: []};

export const ModalManagerPlugin = {
  reducers: modalManagerReducer,
  state: modalManagerInitialState,
  Component: ModalManagerComponent,
};
