import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [scores, setScores] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteAnecdote = () => {
    const copy = [...scores];
    copy[selected] += 1;
    setScores(copy);
  };

  const anecdoteWithMostVotes = () => {
    return anecdotes[
      scores.reduce((maxIndex, currentValue, currentIndex, array) => {
        return array[maxIndex] < currentValue ? currentIndex : maxIndex;
      }, 0)
    ];
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={handleVoteAnecdote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />
      <p>has {scores[selected]} votes</p>

      <h1>Anecdote with most votes</h1>
      <p>{anecdoteWithMostVotes()}</p>
    </div>
  );
};

export default App;
