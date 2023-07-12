import React, {useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {BrowserPlugin} from '../plugin';
import {ACTIONS} from '../actions';

export class FooterPlugin implements BrowserPlugin<any, any> {
  footerComponent({state, dispatch, browserRef}: any) {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flexGrow: 1}}></View>
        <Pressable
          onPress={() => browserRef.current.goBack()}
          style={{backgroundColor: '#ddd', padding: 20}}>
          <Text style={{alignSelf: 'center'}}>Go Back</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            dispatch({type: ACTIONS.MODALS.ADD_MODAL, payload: 'test-modal'})
          }
          style={{backgroundColor: '#ccc', padding: 20}}>
          <Text style={{alignSelf: 'center'}}>Menu</Text>
        </Pressable>
      </View>
    );
  }
}
