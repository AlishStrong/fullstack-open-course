import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const nameChange = (event) => setNewName(event.target.value);

  const submitName = (event) => {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitName}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App;