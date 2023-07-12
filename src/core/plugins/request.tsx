import React, {useEffect} from 'react';
import {BrowserPlugin} from '../plugin';
import {ACTIONS} from '../actions';

export class RequestPlugin implements BrowserPlugin<any, any> {
  initialState = {
    requests: {
      queue: '',
      pokedex: {error: null, loading: false, data: null},
      digdex: {error: null, loading: false, data: null},
    },
  };

  reducer(state: any, action: any) {
    switch (action.type) {
      case ACTIONS.REQUESTS.FETCH: {
        return {
          ...state,
          requests: {
            ...state.requests,
            queue: {...state.requests.queue, [action.payload]: true},
          },
        };
      }
      case ACTIONS.REQUESTS.START_FETCH_POKEDEX: {
        return {
          ...state,
          requests: {
            ...state.requests,
            queue: {...state.requests.queue, pokedex: false},
            pokedex: {error: null, loading: true, data: null},
          },
        };
      }
      case ACTIONS.REQUESTS.START_FETCH_DIGDEX: {
        return {
          ...state,
          requests: {
            ...state.requests,
            queue: {...state.requests.queue, digdex: false},
            digdex: {error: null, loading: true, data: null},
          },
        };
      }
      default:
        return state;
    }
  }

  genericComponent({state, dispatch}: any) {
    useEffect(() => {
      if (state.requests.queue.pokedex) {
        dispatch({type: ACTIONS.REQUESTS.START_FETCH_POKEDEX});
      }
    }, [state.requests.queue.pokedex]);

    useEffect(() => {
      if (state.requests.queue.digdex) {
        dispatch({type: ACTIONS.REQUESTS.START_FETCH_DIGDEX});
      }
    }, [state.requests.queue.digdex]);

    return <></>;
  }
}
