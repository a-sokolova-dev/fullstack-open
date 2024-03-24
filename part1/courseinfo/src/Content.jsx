const Content = ({ exercises }) => {
  return exercises.map((e) => (
    <p>
      {e.title} {e.amount}
    </p>
  ));
};

export default Content;
