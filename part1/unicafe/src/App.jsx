import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad;

  const average = () => {
    return (good - bad) / total();
  };

  const positive_percentage = () => {
    return (good / total()) * 100;
  };

  if (total() === 0) return <p>No feedback given</p>;

  return (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total()}</div>
      <div>average {average()}</div>
      <div>positive {positive_percentage()}%</div>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
