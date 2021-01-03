import React, { useState } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { set as setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [form,setForm] = useState({username:'',password:''})
  const dispatch = useDispatch()
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const handleLogin = (e)=>{
    e.preventDefault()
    dispatch(login(form.username,form.password))
    dispatch(setNotification('success','Login succeed!'))
    setForm({username:'',password:''})
  }
  return (
    <Togglable buttonLabel='login' >
      <form className='form login' onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <label>username<input type='text' name='username' value={form.username} onChange={handleChange} /></label>
        <label>password<input type='password' name='password' value={form.password} onChange={handleChange} /></label>
        <button type="submit">login</button>
      </form>
    </Togglable>
  )
}

export default LoginForm