import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  const handleUser = loggedUser => {
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(loggedUser))
    setUser(loggedUser);
    blogService.setToken(loggedUser.token);
  };

  const handleResponse = response => {
    if (handleResponse) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      );  
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    blogService.setToken(null);
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in <button onClick={logout}>logout</button> </p>
        <BlogForm handleResponse={handleResponse} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    );
  } else {
    return (
      <LoginForm handleUser={handleUser} />
    );
  }
}

export default App;
