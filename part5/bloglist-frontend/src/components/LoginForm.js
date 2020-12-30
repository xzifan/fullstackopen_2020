import React from 'react'

const LoginForm = ({
  handleLogin,
  handleChange,
  username,
  password
}) => {
  return (
    <form className='form' onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <label>username<input type='text' name='username' value={username} onChange={handleChange} /></label>
      <label>password<input type='password' name='password' value={password} onChange={handleChange} /></label>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm