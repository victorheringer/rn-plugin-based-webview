import {useCallback, useReducer} from 'react';

export function useEffectReducer(reducer, initialState, effects) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const customDispatch = useCallback(action => {
    if (effects[action.type]) {
      effects[action.type]({state, action, dispatch});
    } else {
      dispatch(action);
    }
  }, []);

  return [state, customDispatch];
}
