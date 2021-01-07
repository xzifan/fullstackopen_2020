import React, { useState, useRef } from 'react'
import {addBlog} from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import {set as setNotification } from '../reducers/notificationReducer'
import {Button, Form, Input} from 'antd'

const BlogForm = () => {
  const [form,setForm] = useState({title:'',author:'',url:''})
  const dispatch = useDispatch()
  const onSubmit = (e)=>{
    e.preventDefault()
    try{
      dispatch(addBlog(form))
      dispatch(setNotification('success',`a new blog ${form.title} by ${form.author} added`))
      blogFormRef.current.toggleVisibility()
      setForm({title:'',author:'',url:''})
    }catch(error){
      dispatch(setNotification('error',error.response.data))
    }
  }
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const blogFormRef = useRef()
  return (
    <div className='create'>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>Create a new blog</h2>
        <Form {...formItemLayout} onSubmit={onSubmit} className='form blog'>
          <Form.Item label='title'><Input type='text' name='title' value={form.title} onChange={handleChange} /></Form.Item>
          <Form.Item label='author'><Input type='text' name='author' value={form.author} onChange={handleChange}/></Form.Item>
          <Form.Item label='url'><Input type='text' name='url' value={form.url} onChange={handleChange}/></Form.Item>
          <Form.Item><Button type="submit">save</Button></Form.Item>
        </Form>
    </Togglable>
    </div>
  )
}

export default BlogForm