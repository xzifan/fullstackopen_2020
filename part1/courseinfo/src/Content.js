import React from 'react'

const Content =(props)=>{
    let part1 = props.part1;
    let part2 = props.part2;
    let part3 = props.part3;

    return (
        <div>
            <p>
                {part1.name} {part1.exercises}
            </p>
            <p>
                {part2.name} {part2.exercises}
            </p>
            <p>
                {part3.name} {part3.exercises}
            </p>
        </div>
    )
        
}

export default Content;