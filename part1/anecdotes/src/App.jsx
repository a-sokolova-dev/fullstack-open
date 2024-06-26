import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const points = new Array(anecdotes.length).fill(0);

  const getRandomIdx = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const [selected, setSelected] = useState(getRandomIdx());
  const [votes, setVotes] = useState(points);

  const handleGetRandom = () => {
    setSelected(getRandomIdx());
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] = votes[selected] + 1;

    setVotes(updatedVotes);
  };

  const max_idx = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleGetRandom}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max_idx]}</p>
      <p>has {votes[max_idx]} votes</p>
    </div>
  );
};

export default App;
