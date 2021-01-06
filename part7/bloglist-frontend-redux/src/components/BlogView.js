import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { set as setNotification} from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogView = ()=>{
    const [comment,setComment] = useState() 
    const {id} = useParams()
    const blog = useSelector(({blogs})=>blogs).find(n => n.id === id)
    const dispatch = useDispatch()
    const onClickLike = (e,id,updated)=>{
        e.preventDefault()
        try{
          dispatch(likeBlog(id,updated))
          dispatch(setNotification('success',`You liked ${updated.title} by ${updated.author}`))
        }catch (error){
          dispatch(setNotification('error',error.response.data.error))
        }
      }
    const onHandleComment = () => {
        blogService.addComment(id, comment)
    }
    const onChange = (e)=>{
        e.preventDefault()
        setComment(e.target.value)
    }
    if (blog){
        return(<div>
            <h3>{blog.title}</h3>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={(e)=>onClickLike(e,blog.id,{ title:blog.title, author:blog.author, url:blog.url,likes:blog.likes+1 })}>like</button></div>
            <div>added by {blog.author}</div>
            <h4>comments</h4>
            <form onSubmit={onHandleComment}>
                <input type='text' onChange={onChange}/> <button type='submit'>add comment</button>
            </form>
            <ul>
                {blog.comments.map((comment,idx)=><li key={idx}>{comment}</li>)}
            </ul>
        </div>)
    } else return null
}
export default BlogView