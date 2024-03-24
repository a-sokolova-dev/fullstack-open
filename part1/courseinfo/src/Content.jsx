import Part from "./Part";

const Content = ({ exercises }) => {
  return exercises.map((e) => <Part title={e.title} amount={e.amount} />);
};

export default Content;
