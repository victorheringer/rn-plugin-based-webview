import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import {PluginsContext} from '../lib/PluginsContext';

function FooterPluginComponent() {
  const {refs, dispatch} = useContext(PluginsContext);

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flexGrow: 1}}></View>
      <Pressable
        onPress={() => refs.current.browser.goBack()}
        style={{backgroundColor: '#ddd', padding: 20}}>
        <Text style={{alignSelf: 'center'}}>Go Back</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          dispatch({type: 'ADD_MODAL', payload: 'test-modal'});
        }}
        style={{backgroundColor: '#ccc', padding: 20}}>
        <Text style={{alignSelf: 'center'}}>Menu</Text>
      </Pressable>
    </View>
  );
}

export const FooterPlugin = {
  Component: FooterPluginComponent,
};
