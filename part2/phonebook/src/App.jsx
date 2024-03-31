import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    personService.create(nameObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const updatedPersons = persons.filter((person) => person.id !== id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onNameDelete={handleNameDelete} />
    </div>
  );
};

export default App;
