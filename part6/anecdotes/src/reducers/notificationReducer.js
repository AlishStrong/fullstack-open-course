const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.data;
  case 'RESET':
    return '';
  default:
    return state;
  }
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
