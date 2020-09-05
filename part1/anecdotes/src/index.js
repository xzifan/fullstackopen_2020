import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(Array.apply(null, {length: props.anecdotes.length}).map(function() {return 0;}))
  const [max,setMax] = useState(0)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={()=>{
        new Promise ((resolve,reject)=>{
          const copy = [...points]
          copy[selected]+=1
          console.log(copy)
          setPoints(copy) 
          resolve(copy)
          }
        ).then((copy)=>{
          if (copy[selected]>=copy[max])
            setMax(selected)
        })

      }}>vote</button>
      <button onClick={()=>{setSelected(Math.floor(Math.random()*props.anecdotes.length));console.log(selected)}}>next anecdote</button>
      
      <h1>Anecdote with most votes</h1>
      {anecdotes[max]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
