import { useState } from 'react'
import './App.css'
import back from './assets/back.svg'

function App() {
  // Create an array with 30 items
  const squares = Array.from({ length: 30 });
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

  const [typed, setTyped] = useState("");

  const handleClick = (char) => {
    setTyped((prev) => prev + char);
  };

  return (
    <section>
      <div className="max-w-2xl mx-auto w-fit grid grid-cols-5 grid-rows-4 gap-1 p-12">
        {squares.map((_, index) => (
          <div
            key={index}
            className="min-h-20 bg-white aspect-square flex items-center justify-center text-black text-4xl font-bold border-2 border-gray-300"
          >
            {typed[index]}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {row1.map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(row1[index])}
            className="min-w-10 min-h-20 bg-gray-300 cursor-pointer active:scale-95 rounded-md flex items-center justify-center text-black text-2xl font-bold"
          >
            {row1[index]}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {row2.map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(row2[index])}
            className="min-w-10 min-h-20 bg-gray-300 cursor-pointer active:scale-95 rounded-md flex items-center justify-center text-black text-2xl font-bold"
          >
            {row2[index]}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto w-fit flex gap-2 p-1">
        {row3.map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(row3[index])}
            className={`min-h-20 bg-gray-300 cursor-pointer active:scale-95 rounded-md flex items-center justify-center text-black font-bold ${
              index === 0 || index === 8 ? "min-w-16 text-md" : "min-w-10 text-2xl"
            }`}
          >
            {index === 8 ? (
              <img src={back} alt="Back" className="w-7 h-7" />
            ) : (
              row3[index]
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default App
