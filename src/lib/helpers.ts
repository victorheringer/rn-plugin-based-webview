export function joinReducers(reducers: any) {
  return function (state: any, action: any) {
    return reducers.reduce((acc: any, reducer: any) => {
      return reducer ? reducer?.(acc, action) : acc;
    }, state);
  };
}

export function joinInitialState(states: any) {
  return states.reduce((acc: any, state: any) => {
    return {...acc, ...state};
  }, {});
}

export function joinEffects(effects: any) {
  return effects.reduce((acc: any, effects: any) => {
    return {...acc, ...effects};
  }, {});
}

export function joinMiddleware(middlewares: any, map: any) {}
