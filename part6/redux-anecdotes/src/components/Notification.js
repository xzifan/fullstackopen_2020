import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(({notification}) => notification)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (typeof notification === "undefined" || notification === '')
        return null
    else return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification