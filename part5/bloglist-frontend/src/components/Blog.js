import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, onClickLike, onClickDel }) => (
  <div className='blogItem'>
    <span className='title'>{blog.title} </span>
    <Togglable buttonLabel='view' cancelLabel='hide'>
      <div className='url'>{blog.url}</div>
      <div className='likes'>likes {blog.likes} <button onClick={(e) => {onClickLike(e,blog.id,{ title:blog.title, author:blog.author, url:blog.url,likes:blog.likes+1 })}}>like</button></div>
      <div className='author'>{blog.author}</div>
      <button className='btnDelete' onClick={(e) => {onClickDel(e,blog.id,blog.title,blog.author)}}>delete</button>
    </Togglable>
  </div>
)

export default Blog
