/*import {useContext} from 'react';

import {Pressable, Text} from 'react-native';

import {
  joinReducers,
  joinInitialState,
  joinEffects,
  PluginsContext,
  withPluginsProvider,
} from '../core/engine/index';

// Helpers

// State

function PressablePluginComponent() {
  const {state, dispatch} = useContext(PluginsContext);

  return (
    <Pressable
      style={{
        backgroundColor: '#ccc',
        width: '20%',
        justifyContent: 'center',
        height: 50,
      }}
      onPress={() => {
        console.log('pressed');
        dispatch({
          type: 'CREATE_BROWSER_CONFIG_EFFECT',
          payload: 'https://reactnative.dev/movies.json',
        });
      }}>
      <Text style={{alignSelf: 'center'}}>
        {state.browser.loading ? 'Loading' : 'Go'}
      </Text>
    </Pressable>
  );
}
*/
