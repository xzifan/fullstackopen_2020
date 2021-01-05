import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () =>{
    const users = useSelector(({users})=>users)
    
    return (
        <table>
            <thead>
                <tr><th></th><th>Blogs created</th></tr>
            </thead>
            <tbody>
                {users.map(user=>(
                    <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>
                ))}
            </tbody>
            
        </table>
    )
}

export default UserList