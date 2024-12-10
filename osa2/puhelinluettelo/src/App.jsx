import { useState, useEffect } from "react";
import personsService from "./services/persons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Button = ({ handleClick, text, style }) => (
  <button onClick={handleClick} style={style}>
    {text}
  </button>
);

const Person = ({ person, handleRemove }) => (
  <li key={person.id}>
    {person.name} {person.number}
    <Button
      key={person.id}
      handleClick={handleRemove}
      text="delete"
      style={{ marginLeft: "10px" }}
    />
  </li>
);

const Content = ({ persons, handleRemove }) =>
  persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      handleRemove={() => handleRemove(person.id, person.name)}
    />
  ));

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

  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

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

  const removePerson = (id, name) => {
    if (window.confirm(`Delete '${name}' ?`)) {
      personsService
        .remove(id)
        .then((returnedPerson) => {
          setPersons(persons.filter((person) => person.id !== id));
          setFilteredPersons(persons.filter((person) => person.id !== id));

          setNotification(`Deleted: ${returnedPerson.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of '${name} has already been removed from server'`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((n) => id != n.id));

          setFilteredPersons(persons.filter((n) => id != n.id));
        });
    }
  };

  const checkIfPersonExists = () =>
    persons.find((person) => person.name == newName);

  const addPerson = (event) => {
    event.preventDefault();
    if (checkIfPersonExists()) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((n) => n.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personsService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((personMapped) =>
                person.id !== personMapped.id ? personMapped : returnedPerson
              )
            );
            setFilteredPersons(
              persons.map((personMapped) =>
                person.id !== personMapped.id ? personMapped : returnedPerson
              )
            );

            setNewName("");
            setNewNumber("");

            setNotification(`Changed the number of: ${returnedPerson.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch(() => {
            setErrorMessage(
              `Information of '${person.name} has already been removed from server'`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((n) => person.id != n.id));

            setFilteredPersons(persons.filter((n) => person.id != n.id));
          });
        return;
      } else {
        return;
      }
    }

    const person = {
      name: newName,
      number: newNumber,
    };

    personsService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setFilteredPersons(persons.concat(returnedPerson));

      setNewName("");
      setNewNumber("");

      setNotification(`Added: ${returnedPerson.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      <ErrorNotification message={errorMessage} />

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

      <Content
        persons={searchText ? filteredPersons : persons}
        handleRemove={removePerson}
      />
    </div>
  );
};

export default App;
