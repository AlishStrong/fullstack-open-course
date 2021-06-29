const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

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
    const anecdoteToAdd = asObject(anecdote);
    return state.concat(anecdoteToAdd);
  }
  default:
    return state;
  }
};

export const initAction = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  };
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

export default anecdoteReducer;
