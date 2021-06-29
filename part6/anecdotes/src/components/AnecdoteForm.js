import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { clearNotification, setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(addAnecdote(content));
    dispatch(setNotification( `anecdote '${content}' was added`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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
