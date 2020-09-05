import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>{setGood(good+1)}}>good</button>
      <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
      <button onClick={()=>{setBad(bad+1)}}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      

    </div>
  )
}
const Statistics = (props) => {
  const {good,bad,neutral} = props
  var all = good+neutral+bad
  if (good===0 && neutral===0 && bad===0)
    return (<div>No feedback given</div>)
  return(
    <div>
      <table>
        <tbody>
          <Statistic text="good" value ={good} />
          <Statistic text="neutral" value ={neutral} />
          <Statistic text="bad" value ={bad} />
          <Statistic text="all" value = {all}/>
          <Statistic text="average" value = {(good-bad)/all}/>
          <Statistic text="positive" value = {good/all*100+'%'}/>
        </tbody>
      </table>
    </div>
  )
}
const Statistic = (props) => {
  const value = props.value
  return (
    <tr>
      <td>
      {props.text} 
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)