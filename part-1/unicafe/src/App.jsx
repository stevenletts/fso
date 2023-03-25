import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const clicks = [good, neutral, bad];

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h2>Statistics</h2>
      <Statistics clicks={[good, neutral, bad]} />
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ clicks }) => {
  const [good, neutral, bad] = clicks;
  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <div>
        <Stats text="good" count={good} />
        <Stats text="neutral" count={neutral} />
        <Stats text="bad" count={bad} />
        <Stats text="all" count={total} />
        <Stats text="average" count={average} />
        <Stats text="percentage" count={positive} />
      </div>
    );
  }
};

const Stats = (props) => {
  return (
    <p>
      {props.text} {props.count}
    </p>
  );
};

export default App;
