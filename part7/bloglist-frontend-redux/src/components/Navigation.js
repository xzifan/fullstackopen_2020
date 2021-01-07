import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../reducers/loginReducer'
import {Menu} from 'antd'


const Navigation = ()=>{
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const useraccount = useSelector(({user})=>user)
    return(
        // <div className='nav'>
        //     <Link to='/'>blogs</Link> <Link to='/users'>users</Link>  <span>{useraccount.name} logged in </span><Button className='btnLogout' onClick={handleLogout}>log out</Button>
        // </div>
        <Menu mode='horizontal' theme='dark'>
            <Menu.Item><Link to='/'>blogs</Link></Menu.Item>
            <Menu.Item><Link to='/users'>users</Link></Menu.Item>
            <Menu.Item> <span>{useraccount.name} logged in </span> <Button size='small' className='btnLogout' onClick={handleLogout}>log out</Button></Menu.Item>
        </Menu>
    )
}
export default Navigation