import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog }) => (
  <div className='blogItem'>
    <span>{blog.title} </span>
    <Togglable buttonLabel='view' cancelLabel='hide'>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button>like</button></div>
      <div>{blog.author}</div>
    </Togglable>
  </div>
)

export default Blog
