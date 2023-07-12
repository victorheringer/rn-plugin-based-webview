import React, {useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {BrowserPlugin} from '../plugin';
import {ACTIONS} from '../actions';

export class NavbarPlugin implements BrowserPlugin<any, any> {
  headerComponent({state, dispatch}: any) {
    const [url, setUrl] = useState(state.browser.url);

    return (
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={{width: '80%', backgroundColor: '#e3e3e3'}}
          onChangeText={setUrl}
          value={url}
          editable={!state?.loading?.visible}
        />
        <Pressable
          style={{
            backgroundColor: '#ccc',
            width: '20%',
            justifyContent: 'center',
          }}
          onPress={() => {
            console.log('pressed');
            dispatch({type: ACTIONS.BROWSER.SET_URL, payload: url});
          }}>
          <Text style={{alignSelf: 'center'}}>Go</Text>
        </Pressable>
      </View>
    );
  }
}
