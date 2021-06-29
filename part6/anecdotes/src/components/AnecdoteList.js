import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';
import { resetAction, votedAction } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes.sort(({ votes: a }, { votes: b }) => b - a));
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote.id));
    dispatch(votedAction(anecdote.content));
    setTimeout(() => dispatch(resetAction()), 5000);
  };

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnecdoteList;
