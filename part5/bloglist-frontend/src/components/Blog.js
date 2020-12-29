import React from 'react'
const Blog = ({ blog }) => (
  <div className='blogItem'>
    {blog.title} {blog.author}
  </div>
)

export default Blog
