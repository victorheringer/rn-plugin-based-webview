import {useRef, useMemo} from 'react';

import {PluginsContext} from './PluginsContext';
import {useEffectReducer} from './useEffectReducer';

export function PluginsProvider({
  children,
  reducers,
  initialState,
  effects,
  refs,
}) {
  const refList = useRef(refs);
  const [state, dispatch] = useEffectReducer(reducers, initialState, effects);

  const value = useMemo(
    () => ({state, dispatch, refs: refList}),
    [state, dispatch],
  );

  return (
    <PluginsContext.Provider value={value}>{children}</PluginsContext.Provider>
  );
}
