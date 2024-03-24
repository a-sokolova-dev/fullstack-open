import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const exercises = [
    {
      title: "Fundamentals of React",
      amount: 10,
    },
    {
      title: "Using props to pass data",
      amount: 7,
    },
    {
      title: "State of a component",
      amount: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
