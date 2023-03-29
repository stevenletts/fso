import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonService from "./PersonService";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 100000,
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    PersonService.getAll().then((response) => setPersons(response.data));
  }, []);

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

    PersonService.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNum("");
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => setMessage(""), 5000);
    });
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

  const delPerson = (id) => {
    console.log(id);
    PersonService.del(id).then((response) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification m={message} />
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
            key={person.id}
            number={person.number}
            deletePerson={() => delPerson(person.id)}
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

const Notification = ({ m }) => {
  const styles = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (m) {
    return (
      <div className="confirm" style={styles}>
        {m}
      </div>
    );
  } else {
    return null;
  }
};
