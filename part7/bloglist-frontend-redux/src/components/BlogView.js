import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { set as setNotification} from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'

const BlogView = ()=>{
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

    if (blog){
        return(<div>
            <h3>{blog.title}</h3>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={(e)=>onClickLike(e,blog.id,{ title:blog.title, author:blog.author, url:blog.url,likes:blog.likes+1 })}>like</button></div>
            <div>added by {blog.author}</div>
        </div>)
    } else return null
}
export default BlogView