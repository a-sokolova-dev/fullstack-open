import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  let totalExercises = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content exercises={parts} />
      <Total
        total={totalExercises}
      />
    </div>
  );
};

export default App;
