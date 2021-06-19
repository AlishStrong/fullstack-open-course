import React from 'react';

const Person = ({person}) => <div>{person.name} {person.number}</div>;

const Persons = ({people}) => people.map(person => <Person key={person.name} person={person} />)

export default Persons;
