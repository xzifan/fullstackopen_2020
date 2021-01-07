import React, { useState } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { set as setNotification } from '../reducers/notificationReducer'
import { Button, Form, Input, Icon } from 'antd';

const LoginForm = (props) => {
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
    try{
      dispatch(login(form.username,form.password))
      dispatch(setNotification('success','Login succeed!'))
      setForm({username:'',password:''})
    }catch(error){
      dispatch(setNotification('error',error.response.data.error))
    }
  }
  return (
    <Togglable buttonLabel='login' >
      {/* <form className='form login' onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <label>username<input type='text' name='username' value={form.username} onChange={handleChange} /></label>
        <label>password<input type='password' name='password' value={form.password} onChange={handleChange} /></label>
        <Button type="submit">login</Button>
      </form> */}
      <Form onSubmit={handleLogin} layout='horizontal'>
        <Form.Item label="Username">
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              name='username'
              onChange={handleChange}
              value={form.username}
            />
        </Form.Item>
        <Form.Item label="Password">

          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name='password'
            value={form.password}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Togglable>
  )
}
const WrappedLoginForm = Form.create({name:'login_form'})(LoginForm)
export default WrappedLoginForm