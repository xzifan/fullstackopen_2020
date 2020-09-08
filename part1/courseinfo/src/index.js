import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Course.js'
const App = () => {
  // const course={
  //   id : 1,
  //   name: 'Half Stack application development',
  //   parts: [{
  //     name: 'Fundamentals of React',
  //     exercises: 10,
  //     id: 1
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7,
  //     id: 2
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14,
  //     id: 3
  //   }]
  // }
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      {courses.map((c,index)=> <Course course={c} key={index}></Course>)}
    </div>
    // <div>
    //   <Header course={course.name}></Header>
    //   <Content parts = {course.parts}></Content>
    //   <Total parts={course.parts}></Total>
    // </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))