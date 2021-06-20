import React from 'react';
import PersonsService from './PersonsService';

const Person = ({person, removePerson}) => {
  const deletePerson = ({name, id}) => () => {
    const affirmation = window.confirm(`Delete ${name}?`);
    if (affirmation) {
      PersonsService.deletePerson(id)
        .finally(_ => removePerson(id));
    }
  };

  return (
    <div>{person.name} {person.number} <button onClick={deletePerson(person)}>delete</button></div>
  );
};

const Persons = ({people, removePerson}) => people.map(person => <Person key={person.name} person={person} removePerson={removePerson} />)

export default Persons;
