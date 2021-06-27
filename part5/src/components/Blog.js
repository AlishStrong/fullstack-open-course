import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogDetails = ({blog, view}) => {
  const [ blogDetails, setBlogDetails ] = useState({ ...blog });

  const blogDetailsStyle = {
    marginTop: 5
  };

  const likeBlog = async () => {
    const blogToUpdate = blogDetails;
    blogToUpdate.likes += 1;
    const updatedBlog = await blogService.updateBlog(blogToUpdate);
    updatedBlog.user = blogToUpdate.user;
    setBlogDetails(updatedBlog);
  }

  if (view && blogDetails) {
    return (
      <div style={blogDetailsStyle}>
        <div>{blogDetails.url}</div>
        <div>{blogDetails.likes} <button onClick={likeBlog}>like</button></div>
        { blogDetails.user ? <div>{blogDetails.user.name}</div> : null }
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