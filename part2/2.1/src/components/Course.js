const Course = (props) => {
    return (
      <>
        <Header title={props.course.name}></Header>
        <Content parts={props.course.parts}></Content>
        <Total parts={props.course.parts}></Total>
      </>
    )
  }
  
const Header = (props) => {
    return (
        <><h1>{props.title}</h1></>
    )
}

const Content = ({parts}) => {
    return (
        <>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}></Part>)}
        </>
    )
}

const Part = (props) => {
    return (
        <><p>{props.part} {props.exercises}</p></>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <><p><b>Total of {total} exercises</b></p></>
    )
}

export default Course