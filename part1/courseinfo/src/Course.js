import React from 'react'

const Course = (props)=>{
    const header = props.course.name
    const parts = props.course.parts
    return (
      <div>
        <Header course={header}/>
        <Content parts={parts}/>  
      </div>
    )
  }
  
  const Header = (props) =>{
      
    return (
        <h1>{props.course}</h1>
    )
        
  }
  
  const Content =(props)=>{
    var parts = props.parts
    var total = parts.reduce((s,p) => s+p.exercises ,0);
    return (
        <div>
            <div>
            {
                parts.map((part,i)=><Part part={part} key={i}/>)
            }
            </div>
            <Total total={total}/>
        </div>
    )
  }
  
  const Part = (props)=>{
  return (<div>{props.part.name+" "+ props.part.exercises}</div>)
  }
  
  const Total = (props)=>{
    return(<div style={{fontWeight:"bold"}}>total of {props.total} exercises</div>)
  }

  export default Course;