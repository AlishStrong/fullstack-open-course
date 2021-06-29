import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const createdAnecdote = await axios.post(baseUrl, newAnecdote);
  return createdAnecdote.data;
};

const updateAnecdote = async (anecdote) => {
  const updatedAnecdote = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return updatedAnecdote.data;
};

const anecdoteService = { getAll, createAnecdote, updateAnecdote };
export default anecdoteService;