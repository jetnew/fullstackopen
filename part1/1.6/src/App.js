import { useState } from 'react'

const Header = ({title}) => {
  return (<h1>{title}</h1>)
}

const Button = ({label, onClick}) => {
  return (<button onClick={onClick}>{label}</button>)
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  const [good, neutral, bad] = stats
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100
  
  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={all}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="positive" value={positive + " %"}></StatisticLine>
        </tbody>
      </table>
    )
  } else {
    return (<>No feedback given</>)
  } 
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addCounter = (counter, setter) => {
    return () => setter(counter + 1)
  }

  const stats = [good, neutral, bad]
  

  return (
    <div>
      <Header title="give feedback"></Header>
      <Button label="good" onClick={addCounter(good, setGood)}></Button>
      <Button label="neutral" onClick={addCounter(neutral, setNeutral)}></Button>
      <Button label="bad" onClick={addCounter(bad, setBad)}></Button>
      <Header title="statistics"></Header>
      <Statistics stats={stats}></Statistics>
    </div>
  )
}

export default App