const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
