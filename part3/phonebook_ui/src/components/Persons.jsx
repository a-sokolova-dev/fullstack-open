const Persons = ({ persons, onNameDelete }) => {

  return (
    <>
      {persons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}{" "}
          <button onClick={() => onNameDelete(p.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
