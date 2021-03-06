import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(anecdotes.map(_ => 0));

  const randomize = () => () => {
    let random = selected;
    while (selected === random) {
      random = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(random);
  }

  const vote = () => () => {
    const pointsCopy = Array.from(points);
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  }

  const getMostVoted = () => {
    const index = points.indexOf(points.reduce(
        (pr, cr) => {
          if (cr > pr) {
            return cr;
          } else if (cr < pr) {
            return pr;
          } else {
            return pr;
          }
        }
      )
    );
    return anecdotes[index];
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]}</p>
      <button onClick={vote()}>vote</button>
      <button onClick={randomize()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{getMostVoted()}</p>
    </div>
  )
}

export default App;