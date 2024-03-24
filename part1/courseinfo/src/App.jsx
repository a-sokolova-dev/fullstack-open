import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  let totalExercises = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total
        total={totalExercises}
      />
    </div>
  );
};

export default App;
