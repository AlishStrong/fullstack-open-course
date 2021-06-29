import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAnecdotes, voteAction } from '../reducers/anecdoteReducer';
import { resetAction, votedAction } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(a => a.content.includes(filter))
      .sort(({ votes: a }, { votes: b }) => b - a);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    anecdoteService.updateAnecdote(votedAnecdote)
      .then(updatedAnecdote => {
        dispatch(voteAction(updatedAnecdote.id));
        dispatch(votedAction(updatedAnecdote.content));
        setTimeout(() => dispatch(resetAction()), 5000);
      });
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
