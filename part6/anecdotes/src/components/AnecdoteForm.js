import React from 'react';
import { useDispatch } from 'react-redux';
import { addAction } from '../reducers/anecdoteReducer';
import { createdAction, resetAction } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const createdAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(addAction(createdAnecdote));
    dispatch(createdAction(createdAnecdote.content));
    setTimeout(() => dispatch(resetAction()), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
