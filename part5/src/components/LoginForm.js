import React, { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({handleUser}) => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUsername('');
      setPassword('');
      handleUser(user);
    } catch (exception) {
      alert('wrong credentials');
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </div>
  )
}
    
export default LoginForm;
