import {BrowserPlugin} from '../plugin';
import {ACTIONS} from '../actions';

export class CorePlugin implements BrowserPlugin<any, any> {
  initialState = {browser: {url: 'https://reactnative.dev/', history: []}};

  onLoadEnd({dispatch}: any) {
    dispatch({type: ACTIONS.REQUESTS.FETCH, payload: 'digdex'});
  }

  reducer(state: any, action: any) {
    switch (action.type) {
      case ACTIONS.BROWSER.SET_URL: {
        return {
          ...state,
          browser: {
            ...state.browser,
            url: action.payload,
            history: [...state.browser.history, action.payload],
          },
        };
      }
      default:
        return state;
    }
  }
}
