import anecdoteService from '../services/anecdoteService';

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data;
  case 'VOTE': {
    const anecdoteId = action.data.anecdoteId;
    const anecdoteToVote = state.find(a => a.id === anecdoteId);
    const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
    return state.map(a => a.id === anecdoteId ? votedAnecdote : a);
  }
  case 'ADD': {
    const anecdote = action.data.anecdote;
    return state.concat(anecdote);
  }
  default:
    return state;
  }
};

export const voteAction = (anecdoteId) => {
  return {
    type: 'VOTE',
    data: { anecdoteId }
  };
};

export const addAction = (anecdote) => {
  return {
    type: 'ADD',
    data: { anecdote }
  };
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

export default anecdoteReducer;
