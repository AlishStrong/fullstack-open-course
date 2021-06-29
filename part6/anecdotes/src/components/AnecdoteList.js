import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAnecdotes, voteForAnecdote } from '../reducers/anecdoteReducer';
import { clearNotification, setNotification, setTimeoutId } from '../reducers/notificationReducer';

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
    dispatch(voteForAnecdote(anecdote));
    dispatch(setNotification(`you voted for '${anecdote.content}'`));
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    dispatch(setTimeoutId(timeoutId));
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
