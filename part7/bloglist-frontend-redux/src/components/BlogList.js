import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import {List} from 'antd'

const BlogList = ()=>{
    const blogs = useSelector(({blogs})=> blogs)

    return <List 
                bordered
                dataSource={blogs}
                renderItem={item=>(
                    <List.Item key={item.id}><Blog  blog={item}/></List.Item>
                )}
            />
}

export default BlogList