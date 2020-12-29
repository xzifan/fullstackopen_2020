import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, onClickLike, onClickDel }) => (
  <div className='blogItem'>
    <span>{blog.title} </span>
    <Togglable buttonLabel='view' cancelLabel='hide'>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={(e)=>{onClickLike(e,blog.id,{title:blog.title, author:blog.author, url:blog.url,likes:blog.likes+1})}}>like</button></div>
      <div>{blog.author}</div>
      <button onClick={(e)=>{onClickDel(e,blog.id,blog.title,blog.author)}}>delete</button>
    </Togglable>
  </div>
)

export default Blog
