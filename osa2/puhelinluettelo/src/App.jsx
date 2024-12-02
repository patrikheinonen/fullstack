import { useState } from "react";

const Person = ({ person }) => (
  <li key={person.id}>
    {person.name} {person.number}
  </li>
);

const Content = ({ persons }) =>
  persons.map((person) => <Person key={person.id} person={person} />);

// { id: 0, name: "Arto Hellas", number: "LAalalla" }

const SearchInput = (props) => (
  <div>
    Search:{" "}
    <input value={props.searchText} onChange={props.handleSearchChange} />{" "}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const [searchText, setSearchText] = useState("");

  function searchPersons(searchText) {
    const query = searchText.toLowerCase();

    setFilteredPersons(
      persons.filter((contact) => contact.name.toLowerCase().includes(query))
    );
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    searchPersons(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const checkIfPersonExists = () =>
    persons.find((person) => person.name == newName);

  const addPerson = (event) => {
    event.preventDefault();
    if (checkIfPersonExists()) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    setPersons(persons.concat(person));
    setFilteredPersons(persons.concat(person));

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchInput
        props
        searchText={searchText}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />{" "}
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>

      <Content persons={searchText ? filteredPersons : persons} />
    </div>
  );
};

export default App;
