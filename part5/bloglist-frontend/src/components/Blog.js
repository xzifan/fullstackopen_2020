import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'


const Blog = ({ blog, onClickLike }) => (
  <div className='blogItem'>
    <span>{blog.title} </span>
    <Togglable buttonLabel='view' cancelLabel='hide'>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={(e)=>{onClickLike(e,blog.id,{title:blog.title, author:blog.author, url:blog.url,likes:blog.likes+1})}}>like</button></div>
      <div>{blog.author}</div>
    </Togglable>
  </div>
)

export default Blog
