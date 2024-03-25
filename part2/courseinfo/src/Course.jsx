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

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
    </div>
  );
};

export default Course;
