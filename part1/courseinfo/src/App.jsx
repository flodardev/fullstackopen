import { useState } from "react"

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
    {name: "Fundamentals of React", exercise: 10},
    {name: "Using props to pass data", exercise: 7}, 
    {name: "State of a component", exercise: 14}, 
    ]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  // console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  // console.log(props.parts)
  return (
    <>
      <Part parts = {props.parts[0]}/>
      <Part parts = {props.parts[1]}/>
      <Part parts = {props.parts[2]}/>
    </>
  )
}

const Part = (props) => {
  // console.log(props.parts)
  return (
    <p>
      {props.parts.name} {props.parts.exercise}
    </p>
  )
}

const Total = (props) => {
  //console.log(props.parts)
  
  const parts = props.parts
  const total = parts.reduce((sum, element) => sum + element.exercise, 0);

 return (
  <p>Number of exercises {total}</p>
 )
}

export default App