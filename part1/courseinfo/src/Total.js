import React from 'react'

const Total = (props) => {
    let parts = props.parts
    console.log(props)
    return (
        <p>Number of exercises {parts[0].exercises + parts[0].exercises  + parts[0].exercises }</p>
    )

        
}

export default Total;