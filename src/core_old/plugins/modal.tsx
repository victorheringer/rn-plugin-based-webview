import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {BrowserPlugin} from '../plugin';
import {ACTIONS} from '../actions';

const CLOSE_TOKEN = 'close-modal';

export class ModalPlugin implements BrowserPlugin<any, any> {
  initialState = {modals: []};

  onLoadEnd({dispatch}: any) {
    dispatch({type: ACTIONS.REQUESTS.FETCH, payload: 'pokedex'});
  }

  reducer(state: any, action: any) {
    switch (action.type) {
      case ACTIONS.MODALS.ADD_MODAL: {
        const [, ...rest] = state.modals;
        return {...state, modals: [...rest, action.payload, CLOSE_TOKEN]};
      }
      case ACTIONS.MODALS.CLOSE_MODAL: {
        const [current] = state.modals;
        const start = current !== CLOSE_TOKEN ? 2 : 1;
        return {...state, modals: state.modals.slice(start)};
      }
      case ACTIONS.MODALS.CLEAR_LIST: {
        return {...state, modals: []};
      }
      default:
        return state;
    }
  }

  genericComponent({state, dispatch}: any) {
    const [current] = state.modals;

    return (
      <View>
        <Modal isVisible={current === 'test-modal'}>
          <View style={{flex: 1, height: 200}}>
            <Pressable
              onPress={() => dispatch({type: ACTIONS.MODALS.CLOSE_MODAL})}>
              <Text style={{backgroundColor: '#F00'}}>Close Modal</Text>
            </Pressable>
            <Text style={{backgroundColor: '#FFF'}}>
              I am the modal content!
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}
