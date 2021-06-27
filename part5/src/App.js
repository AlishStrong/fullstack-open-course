import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  const handleUser = user => {
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
    setUser(user);
  };

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    console.log('localStorage useEffect');
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in <button onClick={logout}>logout</button> </p>
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
