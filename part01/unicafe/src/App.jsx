import { useState } from 'react'

const StatisticLine = (props) => {
  return (
      <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
      </tr>
    
  )
}


const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={(props.good - props.bad) / props.all} />
        <StatisticLine text="positive" value={((props.good / props.all) * 100) + '%'} />
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" good={good} neutral={neutral} bad={bad}/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" good={good} neutral={neutral} bad={bad}/>
      <Button onClick={() => setBad(bad + 1)} text="bad" good={good} neutral={neutral} bad={bad}/>
      <h1>statistics</h1>
      <Statistics all={all} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App