import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const BlogDetails = ({ blog, view, likeBlog, removeBlog }) => {
  const blogDetailsStyle = {
    marginTop: 5
  };

  const incrementLike = () => likeBlog(blog);
  const remove = () => removeBlog(blog.id);

  if (view && blog) {
    return (
      <div style={blogDetailsStyle}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={incrementLike}>like</button></div>
        { blog.user ? <div>{blog.user.name}</div> : null }
        { blog.removable ? <div><button onClick={remove}>remove</button></div> : null}
      </div>
    );
  } else {
    return null;
  }
};

const Blog = ({ blog, likeBlog, removeBlog, username }) => {
  const [ view, setView ] = useState(false);

  const blogStyle = {
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  useEffect(() => {
    if (blog.user && blog.user.username === username) {
      blog.removable = true;
    }
  }, [blog, username]);

  const toggleView = () => setView(!view);

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
      <BlogDetails blog={blog} view={view} likeBlog={likeBlog} removeBlog={removeBlog} />
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default Blog;