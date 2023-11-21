import { useState } from 'react';

const MorraGame = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ['rock', 'paper', 'scissors'];

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerRandomChoice);
    calculateResult(choice, computerRandomChoice);
  };

  const calculateResult = (user, computer) => {
    if (user === computer) {
      setResult('It\'s a draw!');
    } else if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('Computer wins!');
    }
  };

  return (
    <div>
      <h1>Morra Cinese</h1>
      <div>
        <p>Your Choice: {userChoice}</p>
        <p>Computer's Choice: {computerChoice}</p>
        <p>{result}</p>
      </div>
      <div>
        <button onClick={() => handleUserChoice('rock')}>Rock</button>
        <button onClick={() => handleUserChoice('paper')}>Paper</button>
        <button onClick={() => handleUserChoice('scissors')}>Scissors</button>
      </div>
    </div>
  );
};

export default MorraGame;
