import React from 'react'
// import Togglable from './Togglable'
// import { useDispatch } from 'react-redux'
// import { deleteBlog, likeBlog } from '../reducers/blogReducer'
// import { set as setNotification} from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    // const dispatch = useDispatch()
    // const onClickDel = (e,id,title,author)=>{
    //   e.preventDefault()
    //   try{
    //     console.log(id,title,author)
    //     dispatch(deleteBlog(id))
    //     dispatch(setNotification('success',`Blog ${title} by ${author} is removed`))
    //   }catch (error){
    //     dispatch(setNotification('error',error.response.data.error))
    //   }
    // }
    // const onClickLike = (e,id,updated)=>{
    //   e.preventDefault()
    //   try{
    //     dispatch(likeBlog(id,updated))
    //     dispatch(setNotification('success',`You liked ${updated.title} by ${updated.author}`))
    //   }catch (error){
    //     dispatch(setNotification('error',error.response.data.error))
    //   }
    // }
    return (
      <Link className='title' to={`/blogs/${blog.id}`} >{blog.title} </Link>
    )
  }
  

export default Blog
