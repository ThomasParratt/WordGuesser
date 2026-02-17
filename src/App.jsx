import { useState } from 'react'
import './App.css'
import back from './assets/back.svg'

function App() {
  // Create an array with 30 items
  const answer = ['H', 'E', 'L', 'L', 'O'];
  const squares = Array.from({ length: 30 });
  const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

  const [typed, setTyped] = useState("");
  const [activeGreen, setGreen] = useState([]);
  const [activeOrange, setOrange] = useState([]);
  const [activeGray, setGray] = useState([]);
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
      //console.log("char:" + char);
      //console.log("answer[chars]:" + answer[chars]);
      if (!activeGreen.includes(index) && char === answer[chars]) 
      {
        setGreen([...activeGreen, index]);
      }
      else if (!activeOrange.includes(index) && answer.includes(alphabet[index]))
      {
        setOrange([...activeOrange, index]);
      }
      else (!activeGray.includes(index))
      {
        setGray([...activeGray, index]);
      }
    }
    //console.log(chars);
    //console.log(attempts);
  };

  return (
    <section>
      <div className="max-w-2xl mx-auto w-fit grid grid-cols-5 grid-rows-4 gap-1 p-12">
        {squares.map((_, index) => {
          const row = Math.floor(index / 5);
          const isCompletedRow = row < attempts;

          const letter = typed[index];
          const correctLetter = answer[index % 5];

          const isCorrect = letter === correctLetter;
          const isPresent = letter && answer.includes(letter);

          let bgClass = "bg-white text-black border-2 border-gray-300";

          if (isCompletedRow) {
            if (isCorrect) {
              bgClass = "bg-green-600 text-white border-0";
            } else if (isPresent) {
              bgClass = "bg-amber-400 text-white border-0";
            } else {
              bgClass = "bg-gray-600 text-white border-0";
            }
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

      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(0, 10).map((value, index) => {
          let bgClass = "bg-gray-300 text-black";
          if (activeGreen.includes(index) && attempts)
          {
            bgClass = "bg-green-600 text-white";
          }
          else if (activeOrange.includes(index) && attempts)
          {
            bgClass = "bg-amber-400 text-white";
          }
          else if (activeGray.includes(index) && attempts)
          {
            bgClass = "bg-gray-600 text-white";
          }
          return (
            <div
              key={index}
              onClick={() => handleClick(value, index)}
              className={`min-w-10 min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center text-2xl font-bold ${
                bgClass
              }`}
            >
              {value}
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(10, 19).map((value, index) => {
          let bgClass = "bg-gray-300 text-black";
          if (activeGreen.includes(index + 10) && attempts)
          {
            bgClass = "bg-green-600 text-white";
          }
          else if (activeOrange.includes(index + 10) && attempts)
          {
            bgClass = "bg-amber-400 text-white";
          }
          else if (activeGray.includes(index + 10) && attempts)
          {
            bgClass = "bg-gray-600 text-white";
          }
          return (
            <div
              key={index + 10}
              onClick={() => handleClick(value, index + 10)}
              className={`min-w-10 min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center text-2xl font-bold ${
                bgClass
              }`}
            >
              {value}
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {alphabet.slice(19, 28).map((value, index) => {
          let bgClass = "bg-gray-300 text-black";
          if (activeGreen.includes(index + 19) && attempts)
          {
            bgClass = "bg-green-600 text-white";
          }
          else if (activeOrange.includes(index + 19) && attempts)
          {
            bgClass = "bg-amber-400 text-white";
          }
          else if (activeGray.includes(index + 19) && attempts)
          {
            bgClass = "bg-gray-600 text-white";
          }
          return (
            <div
              key={index}
              onClick={() => handleClick(value, index + 19)}
              className={`min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center font-bold ${
                (index === 0 || index === 8 ? "min-w-16 text-md" : "min-w-10 text-2xl") + " " + (bgClass)
              }`}
            >
              {index === 8 ? (
                <img src={back} alt="Back" className="w-7 h-7" />
              ) : (
                value
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default App
