import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  const handleUser = user => setUser(user);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in</p>
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
