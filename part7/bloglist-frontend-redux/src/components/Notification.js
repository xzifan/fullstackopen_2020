import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () =>{
    const notification = useSelector(({notification})=>notification)
    return (<div className={notification.type}>{notification.content}</div>)
}

export default Notification