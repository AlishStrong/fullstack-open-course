import React from 'react';

const Header = ({name}) => <h1>{name}</h1>;

const Part = ({part}) => <p>{part.name} {part.exercises}</p>;

const Content = ({parts}) => parts.map(part => <Part key={part.id} part={part} />);

const Total = ({parts}) => <p><b>total of {parts.reduce((pr, cr) => pr + cr.exercises, 0)} exercises</b></p>

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default Course;