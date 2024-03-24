import Part from "./Part";

const Content = ({ exercises }) => {
  return exercises.map((e) => (
    <Part key={e.name} title={e.name} amount={e.exercises} />
  ));
};

export default Content;
