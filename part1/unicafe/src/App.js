import React, { useState } from 'react';

const Statistics = ({good, neutral, bad, history, getAverage, getPositive}) => {
  if (history.length === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>
        <div>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {history.length}</p>
          <p>average {getAverage}</p>
          <p>positive {getPositive} %</p>
        </div>
      </>
    );
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [history, setHistory] = useState([]);

  const giveFeedback = (rating) => () => {
    switch (rating) {
      case 1:
        setGood(good + 1);
        break;
      case -1:
        setBad(bad + 1);
        break;
      default:
        setNeutral(neutral + 1)
        break;
    }
    setHistory(history.concat(rating));
  }

  const getAverage = () => history.length > 0 ? history.reduce((pr, cr) => pr + cr, 0) / history.length : 0;

  const getPositive = () => history.length > 0 ? good * 100 / history.length : 0;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={giveFeedback(1)}>good</button>
        <button onClick={giveFeedback(0)}>neutral</button>
        <button onClick={giveFeedback(-1)}>bad</button>
      </div>
      <Statistics 
        good={good} 
        bad={bad} 
        neutral={neutral} 
        history={history} 
        getAverage={getAverage()} 
        getPositive={getPositive()} 
      />
    </div>
  )
}

export default App;