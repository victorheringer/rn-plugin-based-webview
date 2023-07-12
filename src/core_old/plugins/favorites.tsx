import {BrowserPlugin} from '../plugin';
import {ACTIONS} from '../actions';

export class FavoritePlugin implements BrowserPlugin<any, any> {
  initialState = {favorites: []};

  reducer(state: any, action: any) {
    switch (action.type) {
      case ACTIONS.FAVORITES.ADD_FAVORITE: {
        return {...state, favorites: [...state.favorites, state.browser.url]};
      }
      default:
        return state;
    }
  }
}
