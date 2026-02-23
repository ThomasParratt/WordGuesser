import { useState } from 'react'
import './App.css'
import back from './assets/back.svg'

function App() {
  const answer = ['H', 'E', 'L', 'L', 'O'];
  const squares = Array.from({ length: 30 });
  const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

  const [typed, setTyped] = useState("");
  const [activeGreen, setGreen] = useState([]);
  const [activeOrange, setOrange] = useState([]);
  const [activeGray, setGray] = useState([]);
  const [chars, setChars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  // NEW: store per-tile results as 'green' | 'orange' | 'gray' | null
  const [tileResults, setTileResults] = useState(Array(30).fill(null));

  const evaluateGuess = (guess) => {
    // guess is an array of 5 letters
    const result = Array(5).fill(null);

    // Count available letters for orange (exclude greens)
    const answerCounts = {};
    answer.forEach((l, i) => {
      if (guess[i] !== l) {
        answerCounts[l] = (answerCounts[l] || 0) + 1;
      }
    });

    // First pass: greens
    guess.forEach((letter, i) => {
      if (letter === answer[i]) {
        result[i] = 'green';
      }
    });

    // Second pass: oranges and grays
    guess.forEach((letter, i) => {
      if (result[i] === 'green') return;
      if (answerCounts[letter] > 0) {
        result[i] = 'orange';
        answerCounts[letter]--;
      } else {
        result[i] = 'gray';
      }
    });

    return result;
  };

  const handleClick = (char, index) => {
    if (chars === 5 && index - 19 === 0) // ENTER
    {
      const start = attempts * 5;
      const guess = typed.slice(start, start + 5).split("");
      const result = evaluateGuess(guess);

      // Update tile results
      const newTileResults = [...tileResults];
      result.forEach((r, i) => {
        newTileResults[start + i] = r;
      });
      setTileResults(newTileResults);

      // Update keyboard colors
      const newGreen = [...activeGreen];
      const newOrange = [...activeOrange];
      const newGray = [...activeGray];

      guess.forEach((letter, i) => {
        const keyIndex = alphabet.indexOf(letter);
        if (result[i] === 'green') {
          if (!newGreen.includes(keyIndex)) newGreen.push(keyIndex);
          // Remove from orange if it was there before
          const oi = newOrange.indexOf(keyIndex);
          if (oi !== -1) newOrange.splice(oi, 1);
        } else if (result[i] === 'orange') {
          if (!newGreen.includes(keyIndex) && !newOrange.includes(keyIndex))
            newOrange.push(keyIndex);
        } else {
          if (!newGreen.includes(keyIndex) && !newOrange.includes(keyIndex))
            newGray.push(keyIndex);
        }
      });

      setGreen(newGreen);
      setOrange(newOrange);
      setGray(newGray);
      setAttempts(prev => prev + 1);
      setChars(0);
    }
    else if (index - 19 !== 0 && index - 19 !== 8) // SELECTING CHAR
    {
      if (chars < 5) {
        setChars(prev => prev + 1);
        setTyped(prev => prev + char);
      }
    }
    else if (index - 19 === 8) // BACK
    {
      if (chars !== 0) {
        setTyped(prev => prev.slice(0, -1));
        setChars(prev => prev - 1);
      }
    }
  };

  return (
    <section>
      <div className="max-w-2xl mx-auto w-fit grid grid-cols-5 grid-rows-4 gap-1 p-12">
        {squares.map((_, index) => {
          const letter = typed[index];
          const result = tileResults[index];

          let bgClass = "bg-white text-black border-2 border-gray-300";
          if (result === 'green') {
            bgClass = "bg-green-600 text-white border-0";
          } else if (result === 'orange') {
            bgClass = "bg-amber-400 text-white border-0";
          } else if (result === 'gray') {
            bgClass = "bg-gray-600 text-white border-0";
          } else if (letter) {
            bgClass = "border-2 border-gray-600";
          }

          return (
            <div
              key={index}
              className={`min-h-20 aspect-square flex items-center justify-center text-4xl font-bold ${bgClass}`}
            >
              {letter}
            </div>
          );
        })}
      </div>

      {/* Keyboard rows unchanged below — just keep your existing JSX */}
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(0, 10).map((value, index) => {
          let bgClass = "bg-gray-300 text-black";
          if (activeGreen.includes(index)) bgClass = "bg-green-600 text-white";
          else if (activeOrange.includes(index)) bgClass = "bg-amber-400 text-white";
          else if (activeGray.includes(index)) bgClass = "bg-gray-600 text-white";
          return (
            <div key={index} onClick={() => handleClick(value, index)}
              className={`min-w-10 min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center text-2xl font-bold ${bgClass}`}>
              {value}
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(10, 19).map((value, index) => {
          let bgClass = "bg-gray-300 text-black";
          if (activeGreen.includes(index + 10)) bgClass = "bg-green-600 text-white";
          else if (activeOrange.includes(index + 10)) bgClass = "bg-amber-400 text-white";
          else if (activeGray.includes(index + 10)) bgClass = "bg-gray-600 text-white";
          return (
            <div key={index + 10} onClick={() => handleClick(value, index + 10)}
              className={`min-w-10 min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center text-2xl font-bold ${bgClass}`}>
              {value}
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(19, 28).map((value, index) => {
          let bgClass = "bg-gray-300 text-black";
          if (activeGreen.includes(index + 19)) bgClass = "bg-green-600 text-white";
          else if (activeOrange.includes(index + 19)) bgClass = "bg-amber-400 text-white";
          else if (activeGray.includes(index + 19)) bgClass = "bg-gray-600 text-white";
          return (
            <div key={index} onClick={() => handleClick(value, index + 19)}
              className={`min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center font-bold ${
                (index === 0 || index === 8 ? "min-w-16 text-md" : "min-w-10 text-2xl") + " " + bgClass
              }`}>
              {index === 8 ? <img src={back} alt="Back" className="w-7 h-7" /> : value}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default App