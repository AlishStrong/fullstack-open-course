const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET':
    state = action.data;
    return state;
  default:
    state = '';
    return state;
  }
};

export const setFilter = (filter) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: filter
    });
  };
};


export default filterReducer;
