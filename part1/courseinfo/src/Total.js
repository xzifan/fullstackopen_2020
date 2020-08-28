import React from 'react'

const Total = (props) => {
    let part1 = props.part1;
    let part2 = props.part2;
    let part3 = props.part3;
    console.log(props)
    return (
        <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    )

        
}

export default Total;