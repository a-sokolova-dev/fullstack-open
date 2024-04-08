import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    let changedPerson = persons.find((p) => p.name === newName);
    if (
      changedPerson &&
      window.confirm(
        `${newName} is already to the phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(changedPerson.id, nameObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== changedPerson.id ? p : returnedPerson))
          );
          setNewName("");
          setNewNumber("");
        });

      return;
    }

    personService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");

      setNotification(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
