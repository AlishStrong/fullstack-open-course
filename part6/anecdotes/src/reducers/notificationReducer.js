const notificationReducer = (state = { message: null, toId: null }, action) => {
  switch (action.type) {
  case 'NOTIFY':
    clearTimeout(state.toId);
    return { ...state, message: action.data };
  case 'RESET':
    return { ...state, message: null };
  case 'TOID': {
    const newState = { ...state, toId: action.toId };
    return newState;
  }
  default:
    return state;
  }
};

export const setTimeoutId = timeoutId => {
  return async dispatch => {
    dispatch({
      type: 'TOID',
      toId: timeoutId
    });
  };
};

export const setNotification = message => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: message
    });
  };
};

export const clearNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'RESET'
    });
  };
};

export default notificationReducer;
