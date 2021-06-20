import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import PersonsService from './PersonsService';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

  const nameChange = (event) => setNewName(event.target.value);
  const numberChange = (event) => setNewNumber(event.target.value);
  const searchChange = (event) => setSearchName(event.target.value);

  const people = searchName === '' ? persons : 
    persons.filter(person => person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));

  const submitName = (event) => {
    event.preventDefault();
    if (persons.map(person => person.name.toLocaleLowerCase()).includes(newName.toLocaleLowerCase())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      PersonsService.createPerson(newPerson)
        .then(person => setPersons(persons.concat(person)))
        .catch(_ => alert(`An issue happened trying to save a person ${newPerson.name} with number ${newPerson.number}`))
        .finally(() => {
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const getPeopleHook = () => {
    PersonsService.getAllPeople()
      .then(people => setPersons(people));
  };

  useEffect(getPeopleHook, []);

  const removePerson = (personId) => {
    setPersons(persons.filter(p => p.id !== personId));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} searchChange={searchChange} />
      <h2>add a new</h2>
      <PersonForm 
        submitName={submitName} 
        newName={newName} 
        newNumber={newNumber} 
        nameChange={nameChange} 
        numberChange={numberChange} 
      />
      <h2>Numbers</h2>
      <Persons people={people} removePerson={removePerson} />
    </div>
  );
}

export default App;