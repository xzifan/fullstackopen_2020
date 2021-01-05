import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const User = ()=>{
    let {id} = useParams()
    const user = useSelector(({users})=>users).find(n => n.id ===id)
    if (user){
        return (
            <div className='user'>
                <h3>{user.name}</h3>
                <h4>added blogs</h4>
                <ul>
                    {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
                </ul>
            </div>
        )
    } else return null
}

export default User