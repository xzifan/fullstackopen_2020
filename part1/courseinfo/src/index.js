import React from 'react'
import ReactDOM from 'react-dom'
import Total from './Total';
import Content from './Content'
import Header from './Header';

const App = () => {
  const course={
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },{
      name: 'Using props to pass data',
      exercises: 7
    },{
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts = {course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))