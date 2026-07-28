import { useState } from 'react'
import "./App.css"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // onClick functions
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <FeedbackDisplay/>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <FeedbackStatistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const FeedbackDisplay = () => {
  return (
    <div>
      <h2>Give feedback on the food</h2>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const FeedbackStatistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  const averageScore = () => {
    const goodScore = good * 1
    const neutralScore = neutral * 0
    const badScore = bad * -1
    const totalScore = goodScore + neutralScore + badScore

    return ((totalScore / total) || 0)
  }
  const avg = averageScore();

  const percentagePositiveFeeback = ((good / total) * 100) || 0

  if (!total) {
    return <p>No feedback is given</p>
  }

  return (
    <div>
      <h4>Feedback statistics</h4>

      {/* <StatisticLine text="Good" data={good} />
      <StatisticLine text="Neutral" data={neutral} />
      <StatisticLine text="Bad" data={bad} />
      <p>Total # of feedbacks: {total} </p>
      <p>Average score: {avg}</p>
      <p>Percentage of positive feedback: {percentagePositiveFeeback}%</p> */}

      <table>
        <tbody>
          <StatisticTableRow text="Good" data={good}/>
          <StatisticTableRow text="Neutral" data={neutral}/>
          <StatisticTableRow text="Bad" data={bad}/>
          <StatisticTableRow text="Total # of feedbacks" data={total}/>
          <StatisticTableRow text="Average score" data={avg}/>
          <StatisticTableRow text="Good" data={percentagePositiveFeeback}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, data}) => {
  return <p>{text}: {data}</p>
}

const StatisticTableRow = ({text, data}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{data}</td>
    </tr>
  )
}

export default App