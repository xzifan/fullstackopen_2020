import React, { useState, useRef } from 'react'
import {addBlog} from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import {set as setNotification } from '../reducers/notificationReducer'

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
  const blogFormRef = useRef()
  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <div>
        <h2>Create a new blog</h2>

        <form onSubmit={onSubmit} className='form blog'>
          <label>title:<input type='text' name='title' value={form.title} onChange={handleChange} /></label>
          <label>author:<input type='text' name='author' value={form.author} onChange={handleChange}/></label>
          <label>url:<input type='text' name='url' value={form.url} onChange={handleChange}/></label>
          <button type="submit">save</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm