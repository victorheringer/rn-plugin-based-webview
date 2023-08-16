import React, {useState, useContext} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {PluginsContext} from '../lib/PluginsContext';

function HeaderPluginComponent() {
  const {state, dispatch} = useContext(PluginsContext);
  const [url, setUrl] = useState(state.browser.url);

  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        style={{width: '80%', backgroundColor: '#e3e3e3'}}
        onChangeText={setUrl}
        value={url}
        editable
      />
      <Pressable
        style={{
          backgroundColor: '#ccc',
          width: '20%',
          justifyContent: 'center',
        }}
        onPress={() => {
          dispatch({type: 'SET_URL', payload: url});
        }}>
        <Text style={{alignSelf: 'center'}}>Go</Text>
      </Pressable>
    </View>
  );
}

export const HeaderPlugin = {
  Component: HeaderPluginComponent,
};
