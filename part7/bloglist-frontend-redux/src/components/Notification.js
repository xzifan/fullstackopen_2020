import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from 'antd'

const Notification = () =>{
    const notification = useSelector(({notification})=>notification)
    if (notification.content!=='')
        return <Alert message={notification.content} type={notification.type} /> 
    else return ''
}

export default Notification