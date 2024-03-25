const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ exercises }) => {
  return exercises.map((e) => (
    <Part key={e.id} title={e.name} amount={e.exercises} />
  ));
};

const Part = ({ title, amount }) => {
  return (
    <p>
      {title} {amount}
    </p>
  );
};

const Total = ({ total }) => {
  return <b>total of {total} exercises</b>;
};

const Course = ({ course }) => {
  let totalExercises = course.parts.reduce(
    (acc, curr) => acc + curr.exercises,
    0
  );

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default Course;
