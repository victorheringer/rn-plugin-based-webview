import {useRef, useMemo} from 'react';

import {PluginsContext} from './PluginsContext';
import {useEffectReducer} from './useEffectReducer';

export function PluginsProvider({children, reducers, initialState, effects}) {
  const ref = useRef(null);
  const [state, dispatch] = useEffectReducer(reducers, initialState, effects);

  const value = useMemo(() => ({state, dispatch, ref}), [state, dispatch]);

  return (
    <PluginsContext.Provider value={value}>{children}</PluginsContext.Provider>
  );
}
