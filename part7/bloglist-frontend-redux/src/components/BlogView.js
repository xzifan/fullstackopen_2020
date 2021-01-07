import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { set as setNotification} from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import {Button, Card, Input, Icon,Form, Divider} from 'antd'

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
        return(<Card title={blog.title}>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <Button size='small' onClick={(e)=>onClickLike(e,blog.id,{ title:blog.title, author:blog.author, url:blog.url,likes:blog.likes+1 })}><Icon type="like" /></Button></div>
            <div>added by {blog.author}</div>
            <Divider />
            <h3>comments</h3>
            <Form onSubmit={onHandleComment} layout='inline'>
                <Form.Item><Input size='small' type='text' onChange={onChange}/></Form.Item> 
                <Form.Item><Button size='small' type='submit'>add comment</Button></Form.Item>
            </Form>
            <ul>
                {blog.comments.map((comment,idx)=><li key={idx}>{comment}</li>)}
            </ul>
        </Card>)
    } else return null
}
export default BlogView