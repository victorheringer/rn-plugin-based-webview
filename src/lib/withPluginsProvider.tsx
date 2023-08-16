import {PluginsProvider} from './PluginProvider';
import {joinReducers, joinInitialState, joinEffects, joinRefs} from './helpers';

export function withPluginsProvider(
  OriginalComponent,
  reducers,
  initialState,
  effects,
  refs,
) {
  const reducersGroup = joinReducers(reducers);
  const initialStateGroup = joinInitialState(initialState);
  const effectsGroup = joinEffects(effects);

  const refList = joinRefs(refs);

  function NewComponent(props) {
    return (
      <PluginsProvider
        reducers={reducersGroup}
        initialState={initialStateGroup}
        effects={effectsGroup}
        refs={refList}>
        <OriginalComponent {...props} />
      </PluginsProvider>
    );
  }

  return NewComponent;
}
