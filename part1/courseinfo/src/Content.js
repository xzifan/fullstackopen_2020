import React from 'react'

const Content =(props)=>{
    let parts = props.parts

    return (
        <div>
            <p>
                {parts[0].name} {parts[0].exercises}
            </p>
            <p>
                {parts[1].name} {parts[1].exercises}
            </p>
            <p>
                {parts[2].name} {parts[2].exercises}
            </p>
        </div>
    )
        
}

export default Content;