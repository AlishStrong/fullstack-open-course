import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING'
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });

  test('OK is incremented', () => {
    const action = {
      type: 'OK'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    });
  });

  test('BAD is incremented', () => {
    const action = {
      type: 'BAD'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    });
  });

  test('GOOD = 5, OK = 4, BAD = 2', () => {
    const goodAction = {
      type: 'GOOD'
    };
    const okAction = {
      type: 'OK'
    };
    const badAction = {
      type: 'BAD'
    };
    let state = initialState;

    deepFreeze(state);
    for (let i = 0; i < 5; i++) {
      state = counterReducer(state, goodAction);
      if (i < 4) {
        state = counterReducer(state, okAction);
      }
      if (i < 2) {
        state = counterReducer(state, badAction);
      }
    }

    expect(state).toEqual({
      good: 5,
      ok: 4,
      bad: 2
    });
  });

  test('GOOD = 1, OK = 2, BAD = 1. After ZERO all 0', () => {
    const goodAction = {
      type: 'GOOD'
    };
    const okAction = {
      type: 'OK'
    };
    const badAction = {
      type: 'BAD'
    };
    const zeroAction = {
      type: 'ZERO'
    };
    let state = initialState;

    deepFreeze(state);
    for (let i = 0; i < 2; i++) {
      state = counterReducer(state, okAction);
      if (i < 1) {
        state = counterReducer(state, goodAction);
        state = counterReducer(state, badAction);
      }
    }

    expect(state).toEqual({
      good: 1,
      ok: 2,
      bad: 1
    });

    state = counterReducer(state, zeroAction);

    expect(state).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    });
  });
});