import React, { useState } from 'react';

const Button = ({text, giveFeedback}) => {
  return (
    <button onClick={giveFeedback}>{text}</button>
  );
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {text === 'positive' ? '%' : ''}</td>
    </tr>
  )
}

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
        <table>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={history.length} />
            <Statistic text='average' value={getAverage} />
            <Statistic text='positive' value={getPositive} />
          </tbody>
        </table>
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
        <Button text='good' giveFeedback={giveFeedback(1)} />
        <Button text='neutral' giveFeedback={giveFeedback(0)} />
        <Button text='bad' giveFeedback={giveFeedback(-1)} />
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