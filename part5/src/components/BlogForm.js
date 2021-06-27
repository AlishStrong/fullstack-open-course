import React, { useState } from 'react';

const BlogForm = ({ sumbitBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const titleChange = (event) => setTitle(event.target.value);
  const authorChange = (event) => setAuthor(event.target.value);
  const urlChange = (event) => setUrl(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearInputs();
    sumbitBlog({ title, author, url });
  };

  const clearInputs = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input id='titleInput' value={title} onChange={titleChange} />
        </div>
        <div>
          author: <input id='authorInput' value={author} onChange={authorChange} />
        </div>
        <div>
          url: <input id='urlInput' value={url} onChange={urlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
