import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../reducers/loginReducer'


const Navigation = ()=>{
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const useraccount = useSelector(({user})=>user)
    return(
        <div className='nav'>
            <Link to='/'>blogs</Link> <Link to='/users'>users</Link>  <span>{useraccount.name} logged in </span><button className='btnLogout' onClick={handleLogout}>log out</button>
        </div>
    )
}
export default Navigation