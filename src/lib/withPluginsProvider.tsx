import {useMemo} from 'react';

import {PluginsProvider} from './PluginProvider';
import {joinReducers, joinInitialState, joinEffects} from './helpers';

export function withPluginsProvider(
  OriginalComponent,
  reducers,
  initialState,
  effects,
) {
  const reducersGroup = joinReducers(reducers);
  const initialStateGroup = joinInitialState(initialState);
  const effectsGroup = joinEffects(effects);

  function NewComponent(props) {
    return (
      <PluginsProvider
        reducers={reducersGroup}
        initialState={initialStateGroup}
        effects={effectsGroup}>
        <OriginalComponent {...props} />
      </PluginsProvider>
    );
  }

  return NewComponent;
}
