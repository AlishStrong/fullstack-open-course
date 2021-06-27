import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({handleResponse, callback}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const titleChange = (event) => setTitle(event.target.value);
  const authorChange = (event) => setAuthor(event.target.value);
  const urlChange = (event) => setUrl(event.target.value);

  const submitBlog = async (event) => {
    event.preventDefault();
    clearInputs();
    try {
      const response = await blogService.createBlog({
        title,
        author,
        url
      });
      handleResponse({
        type: 'added',
        text: `a new blog ${response.title} by ${response.author} added`
      }, callback);
    } catch (error) {
      console.log(error);
      handleResponse({
        type: 'error',
        text: error.response.data.error
      });
    }
  }

  const clearInputs = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitBlog}>
        <div>
          title: <input value={title} onChange={titleChange} />
        </div>
        <div>
          author: <input value={author} onChange={authorChange} />
        </div>
        <div>
          url: <input value={url} onChange={urlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;