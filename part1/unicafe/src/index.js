import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <button onClick={()=>{setGood(good+1)}}>good</button>
      <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
      <button onClick={()=>{setBad(bad+1)}}>bad</button>

      <h1>statistics</h1>
      {/* <h1>statistics</h1>
      <div>
        good {good} <br/>
        neutral {neutral} <br/>
        bad {bad}
        all {good+neutral+bad} <br/>
        average {(good+neutral+bad)==0 ? 0 : ( good - bad)/(good+neutral+bad)} <br/>
        positive {(good+neutral+bad)==0 ? 0 : 100*( good )/(good+neutral+bad)}%
      </div> */}
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

const Statistics = (props) => {
  var {good,neutral,bad} = props
  if  (good===0 && neutral===0 && bad===0){
    return(<div>No feedback given</div>)
  }else return (
    <div>
      <table>
        <Statistic text="good" value={good}></Statistic>
        <Statistic text="neutral" value={neutral}></Statistic>
        <Statistic text="bad" value={bad}></Statistic>
        <Statistic text="all" value={good+neutral+bad}></Statistic>
        <Statistic text="average" value={( good - bad)/(good+neutral+bad)}></Statistic>
        <Statistic text="positive" value={100*( good )/(good+neutral+bad)+'%'}></Statistic>
      </table>

    </div>
  )
}
const Statistic = (props)=>{
  var value = props.value
  var text = props.text
  return (
    <tbody>
      <tr>
          <th>{text}</th>
          <th>{value}</th>
        </tr> 
    </tbody>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)