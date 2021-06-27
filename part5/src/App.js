import React, { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [ message, setMessage ] = useState({});

  const blogFormRef = useRef();

  const handleUser = loggedUser => {
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(loggedUser));
    setUser(loggedUser);
    blogService.setToken(loggedUser.token);
  };

  const sumbitBlog = async (newBlog) => {
    try {
      const response = await blogService.createBlog(newBlog);
      handleResponse({
        type: 'added',
        text: `a new blog ${response.title} by ${response.author} added`
      });
    } catch (error) {
      handleResponse({
        type: 'error',
        text: error.response.data.error
      });
    } finally {
      completeBlogAddition();
    }
  };

  const handleResponse = (response) => {
    setMessage(response);
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const completeBlogAddition = () => {
    blogFormRef.current.toggleVisibility();
    fetchBlogs();
  };

  const fetchBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort(({ likes: a }, { likes: b }) => b - a);
      setBlogs( blogs );
    });
  };

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    blogService.setToken(null);
  };

  const likeBlog = async (blog) => {
    blog.likes += 1;
    await blogService.updateBlog(blog);
    fetchBlogs();
  };

  const removeBlog = async (blogId) => {
    await blogService.deleteBlog(blogId);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <p>{user.name} is logged in <button onClick={logout}>logout</button> </p>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm sumbitBlog={sumbitBlog} />
        </Togglable>
        <div id='blog-entries' >
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} username={user.username} />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Notification message={message} />
        <LoginForm handleUser={handleUser} handleResponse={handleResponse} />
      </div>
    );
  }
};

export default App;
