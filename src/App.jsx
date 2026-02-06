import { useState } from 'react'
import './App.css'
import back from './assets/back.svg'

function App() {
  // Create an array with 30 items
  const answer = ['H', 'E', 'L', 'L', 'O'];
  const squares = Array.from({ length: 30 });
  const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

  const [typed, setTyped] = useState("");
  const [activeIndices, setActiveIndices] = useState([]);
  const [chars, setChars] = useState(0);
  const [attempts, setAttempts] = useState(0); //to say that an attempt has finished

  const handleClick = (char, index) => {
    if (chars === 5 && index - 19 !== 0)
    {
      return ;
    }
    if (chars === 5 && index - 19 === 0)
    {
      setAttempts(prev => (prev + 1));
      setChars(0);
    }
    else
    {
      setChars(prev => (prev + 1));
    }
    if (index - 19 !== 0 && index - 19 !== 8)
    {
      setTyped((prev) => prev + char);
      if (!activeIndices.includes(index)) 
      {
        setActiveIndices([...activeIndices, index]);
      }
    }
    console.log(chars);
    console.log(attempts);
  };

  return (
    <section>
      <div className="max-w-2xl mx-auto w-fit grid grid-cols-5 grid-rows-4 gap-1 p-12">
        {squares.map((_, index) => {
          var isCorrect = false;
          const row = Math.floor(index / 5); // calculate the row of this square
          const isCompletedRow = row < attempts; // mark completed rows
          if (typed[index] === answer[index])
          {
            isCorrect = true;
          }
          return (
            <div
              key={index}
              className={`min-h-20 aspect-square flex items-center justify-center text-4xl font-bold border-2
                ${typed[index] ? "border-gray-600" : "border-gray-300"}
                ${isCompletedRow && isCorrect ? "bg-green-600 text-white border-0" : "bg-white text-black border-gray-300"}
                ${isCompletedRow ? "bg-gray-600 text-white border-0" : "bg-white text-black border-gray-300"}
              `}
            >
              {typed[index]}
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(0, 10).map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(value, index)}
            className={`min-w-10 min-h-20 bg-gray-300 cursor-pointer active:bg-grey-400 rounded-md flex items-center justify-center text-black text-2xl font-bold ${
              activeIndices.includes(index) && attempts ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(10, 19).map((value, index) => (
          <div
            key={index + 10}
            onClick={() => handleClick(value, index + 10)}
            className={`min-w-10 min-h-20 bg-gray-300 cursor-pointer active:bg-grey-400 rounded-md flex items-center justify-center text-black text-2xl font-bold ${
              activeIndices.includes(index + 10) && attempts ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(19, 28).map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(value, index + 19)}
            className={`min-h-20 bg-gray-300 cursor-pointer active:bg-grey-400 rounded-md flex items-center justify-center text-black font-bold ${
              (index === 0 || index === 8 ? "min-w-16 text-md" : "min-w-10 text-2xl") + " " + (activeIndices.includes(index + 19) && attempts ? "bg-gray-600 text-white" : "bg-gray-300 text-black")
            }`}
          >
            {index === 8 ? (
              <img src={back} alt="Back" className="w-7 h-7" />
            ) : (
              value
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default App
