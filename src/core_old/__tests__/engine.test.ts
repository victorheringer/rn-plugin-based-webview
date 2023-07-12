import {Engine} from '../engine';
import {BrowserPlugin} from '../plugin';

const mockDispatch = jest.fn();

class MockPluginOne implements BrowserPlugin<any, any> {
  initialState = {one: 'value-one'};

  onLoadEnd({state, dispatch, browserRef, params}: any) {
    dispatch(state, browserRef, params);
  }

  reducer(state: any, action: any) {
    switch (action.type) {
      case 'ACTION_TEST_ONE': {
        return {...state, one: action.payload};
      }
    }

    return state;
  }
}

class MockPluginTwo implements BrowserPlugin<any, any> {
  initialState = {two: 'value-two'};

  onLoadEnd({state, dispatch, browserRef, params}: any) {
    dispatch(state, browserRef, params);
  }

  reducer(state: any, action: any) {
    switch (action.type) {
      case 'ACTION_TEST_TWO': {
        return {...state, two: action.payload};
      }
    }

    return state;
  }
}

const mockPluginOne = new MockPluginOne();
const mockPluginTwo = new MockPluginTwo();

const engine = new Engine();
engine.enablePlugin(mockPluginOne);
engine.enablePlugin(mockPluginTwo);

const built = engine.build();

describe('Engine', () => {
  it('should create initial state', () => {
    expect(built.initialState).toEqual({
      one: 'value-one',
      two: 'value-two',
    });
  });

  it('should correctly reduce actions', () => {
    const {reducer, initialState} = built;

    const resultOne = reducer(initialState, {
      type: 'ACTION_TEST_ONE',
      payload: 'reduce-one',
    });

    const resultTwo = reducer(resultOne, {
      type: 'ACTION_TEST_TWO',
      payload: 'reduce-two',
    });

    expect(resultTwo).toEqual({
      one: 'reduce-one',
      two: 'reduce-two',
    });
  });

  it('should create onLoadEnd middleware', () => {
    const {onLoadEnd} = built;

    onLoadEnd('state', mockDispatch, 'ref')('params');

    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith('state', 'ref', ['params']);
  });
});
