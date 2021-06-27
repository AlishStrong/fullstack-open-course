import React, { useState } from 'react';

const BlogDetails = ({blog, view}) => {
  const blogDetailsStyle = {
    marginTop: 5
  };

  if (view && blog) {
    return (
      <div style={blogDetailsStyle}>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        { blog.user ? <div>{blog.user.name}</div> : null }
      </div>
    );
  } else {
    return null;
  }
};

const Blog = ({blog}) => {
  const [ view, setView ] = useState(false);

  const blogStyle = {
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const toggleView = () => setView(!view);

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
      <BlogDetails blog={blog} view={view} />
    </div>
  );  
};

export default Blog