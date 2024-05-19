const Header = ({name}) => {
    return <h1>{name}</h1> 
}
  
const Part = ({part}) => {
    return <p> {part.name} {part.exercises} </p>
}
  
const Content = ({parts}) => {
    return ( 
        <div>
        {parts.map(part => <Part part={part} key={part.id} /> )}
        </div>
    );
}
  
const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => part.exercises + sum, 0)
    return <p>Number of {total} exercises </p> 
}
  
const Course = ({course}) => {
    const name = course.name
    const parts = course.parts
  
    return (
      <>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </>
    )
}

export default Course;