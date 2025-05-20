const Total = ({parts}) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><b>total of {sum} exercises</b></p>
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) =>
	<Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      <Total parts={parts}/>
    </div>)
}

const Header = ({name}) => <h2>{name}</h2>

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

export default Course
