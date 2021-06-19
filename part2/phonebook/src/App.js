import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
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
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  };

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
      <Persons people={people} />
    </div>
  )
}

export default App;