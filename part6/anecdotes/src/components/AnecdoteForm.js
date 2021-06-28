import React from 'react';
import { useDispatch } from 'react-redux';
import { addAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addAction(content));
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