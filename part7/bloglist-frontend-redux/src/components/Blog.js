import React from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { set as setNotification} from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const onClickDel = (e,id,title,author)=>{
      e.preventDefault()
      try{
        console.log(id,title,author)
        dispatch(deleteBlog(id))
        dispatch(setNotification('success',`Blog ${title} by ${author} is removed`))
      }catch (error){
        dispatch(setNotification('error',error.response.data.error))
      }
    }
    const onClickLike = (e,id,updated)=>{
      e.preventDefault()
      try{
        dispatch(likeBlog(id,updated))
        dispatch(setNotification('success',`You liked ${updated.title} by ${updated.author}`))
      }catch (error){
        dispatch(setNotification('error',error.response.data.error))
      }
    }
    return (
    <div className='blogItem'>
      <Link className='title' to={`/blogs/${blog.id}`} >{blog.title} </Link>
      {/* <Togglable buttonLabel='view' cancelLabel='hide'>
        <div className='url'>{blog.url}</div>
        <div className='likes' data-likes={blog.likes}>likes {blog.likes} <button onClick={(e) => {onClickLike(e,blog.id,{ title:blog.title, author:blog.author, url:blog.url,likes:blog.likes+1 })}}>like</button></div>
        <div className='author'>{blog.author}</div>
        <button className='btnDelete' onClick={(e) => {onClickDel(e,blog.id,blog.title,blog.author)}}>delete</button>
      </Togglable> */}
    </div>)
  }
  

export default Blog
