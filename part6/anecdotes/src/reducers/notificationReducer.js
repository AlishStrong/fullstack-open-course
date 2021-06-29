const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'VOTED':
    state = `you voted for '${action.data}'`;
    return state;
  case 'CREATED':
    state = `anecdote '${action.data}' was added`;
    return state;
  case 'RESET':
    state = '';
    return state;
  default:
    return state;
  }
};

export const votedAction = (anecdote) => {
  return {
    type: 'VOTED',
    data: anecdote
  };
};

export const createdAction = (anecdote) => {
  return {
    type: 'CREATED',
    data: anecdote
  };
};

export const resetAction = () => {
  return {
    type: 'RESET'
  };
};

export default notificationReducer;
