import anecdoteService from '../services/anecdoteService';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data;
  case 'VOTE': {
    const anecdote = action.data.anecdote;
    return state.map(a => a.id === anecdote.id ? anecdote : a);
  }
  case 'ADD': {
    const anecdote = action.data.anecdote;
    return state.concat(anecdote);
  }
  default:
    return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes
    });
  };
};

export const addAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(content);
    dispatch({
      type: 'ADD',
      data: { anecdote }
    });
  };
};

export const voteForAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.updateAnecdote({ ...content, votes: content.votes + 1 });
    dispatch({
      type: 'VOTE',
      data: { anecdote }
    });
  };
};

export default anecdoteReducer;
