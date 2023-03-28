import { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");

  const personsToShow = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search))
    : persons;

  const addPerson = (event) => {
    event.preventDefault();
    if (checkNewName(persons, newName)) {
      alert(`${newName} is in phonebook`);
      setNewName("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNum,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNum("");
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} value={search} />
      <h3>Add a New</h3>
      <PersonForm
        handleInputChange={handleInputChange}
        newName={newName}
        newNum={newNum}
        handleNumChange={handleNumChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person
            name={person.name}
            key={person.name}
            number={person.number}
          ></Person>
        ))}
      </ul>
    </div>
  );
};

const checkNewName = (arr, name) => {
  return arr.find((person) => person.name === name);
};

export default App;
