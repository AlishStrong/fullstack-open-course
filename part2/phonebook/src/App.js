import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import Notification from './Notification';
import PersonForm from './PersonForm';
import Persons from './Persons';
import PersonsService from './PersonsService';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  const [ message, setMessage ] = useState({});

  const nameChange = (event) => setNewName(event.target.value);
  const numberChange = (event) => setNewNumber(event.target.value);
  const searchChange = (event) => setSearchName(event.target.value);

  const people = searchName === '' ? persons : 
    persons.filter(person => person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));

  const clearInputs = () => {
    setNewName('');
    setNewNumber('');
  };

  const notify = (text, type) => {
    setMessage({text, type});
    setTimeout(() => setMessage({text: '', type: ''}), 5000);
  }

  const addPerson = () => {
    const newPerson = { name: newName, number: newNumber };
    PersonsService.createPerson(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
        notify(`Added ${person.name}`, 'added');
      })
      .catch(error => {
        if (error.response.data.error) {
          if (error.response.data.error.includes('to be unique')) {
            notify(error.response.data.error + '. Refetching the phonebook list!', 'error');
            getPeopleHook();
          } else {
            notify(error.response.data.error, 'error');
          }
        } else {
          notify(`An issue occured while trying to update the person`, 'error');
        }
      })
      .finally(clearInputs);
  };

  const updatePerson = foundPerson => {
    const updatedPerson = {...foundPerson, number: newNumber};
    PersonsService.updatePerson(foundPerson.id, updatedPerson)
      .then(person => {
        setPersons(persons.map(p => p.id === person.id ? person : p));
        notify(`Updated ${person.name}`, 'updated');
      })
      .catch(error => {
        if (error.response.data.error) {
          notify(error.response.data.error, 'error');
        } else if (+error.response.status !== 500) {
          notify(`Information of ${foundPerson.name} has laready been removed from server`, 'error');
          setPersons(persons.filter(p => p.id !== foundPerson.id));
        } else {
          notify(`An issue occured while trying to update the person`, 'error');
        }
      })
      .finally(clearInputs);
  };

  const removePerson = (personId) => {
    notify(`Removed ${persons.find(p => p.id === personId).name}`, 'deleted');
    setPersons(persons.filter(p => p.id !== personId));
  }

  const submitPerson = (event) => {
    event.preventDefault();
    
    const foundPerson = persons.find(person => {
      return person.name.trim().toLocaleLowerCase() === newName.trim().toLocaleLowerCase();
    });
    
    if (foundPerson) {
      if (foundPerson.number === newNumber) {
        alert(`${newName} with number ${newNumber} is already added to phonebook`);
      } else {
        const affirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (affirmation) {
          updatePerson(foundPerson);
        }
      }
    } else {
      addPerson();
    }
  };

  const getPeopleHook = () => {
    PersonsService.getAllPeople()
      .then(people => setPersons(people));
  };

  useEffect(getPeopleHook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchName={searchName} searchChange={searchChange} />
      <h2>add a new</h2>
      <PersonForm 
        submitPerson={submitPerson} 
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