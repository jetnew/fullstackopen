const Header = (props) => {
  return (
    <><h1>{props.title}</h1></>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].part} exercises={props.parts[0].exercises}></Part>
      <Part part={props.parts[1].part} exercises={props.parts[1].exercises}></Part>
      <Part part={props.parts[2].part} exercises={props.parts[2].exercises}></Part>
    </>
  )
}

const Part = (props) => {
  return (
    <><p>{props.part} {props.exercises}</p></>
  )
}

const Total = (props) => {
  console.log(props)
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <><p>Number of exercises {total}</p></>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ]
  }

  return (
    <div>
      <Header title={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default App