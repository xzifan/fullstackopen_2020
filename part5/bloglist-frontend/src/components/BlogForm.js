import React from 'react'

const BlogForm = ({ onSubmit, handleChange, newBlog}) => {
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={onSubmit} className='form'>
        <label>title:<input type='text' name='title' value={newBlog.title} onChange={handleChange} /></label>
        <label>author:<input type='text' name='author' value={newBlog.author} onChange={handleChange}/></label>
        <label>url:<input type='text' name='url' value={newBlog.url} onChange={handleChange}/></label>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm