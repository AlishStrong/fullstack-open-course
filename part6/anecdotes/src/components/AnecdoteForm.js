import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { clearNotification, setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = ({ addAnecdote, setNotification, clearNotification }) => {
  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    addAnecdote(content);
    setNotification( `anecdote '${content}' was added`);
    setTimeout(() => {
      clearNotification();
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

export default connect(
  null,
  {
    addAnecdote,
    setNotification,
    clearNotification
  }
)(AnecdoteForm);