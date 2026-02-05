import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Create an array with 30 items
  const squares = Array.from({ length: 30 });
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

  return (
    <section>
      <h1 className="text-center text-5xl">WordGuesser</h1>
      <div className="max-w-2xl mx-auto grid grid-cols-5 grid-rows-4 gap-2 p-12">
        {squares.map((_, index) => (
          <div
            key={index}
            className="bg-white aspect-square flex items-center justify-center text-white text-4xl font-bold border-2 border-gray-500"
          >
            C
          </div>
        ))}
      </div>
      <div className="mt-8 max-w-4xl mx-auto w-fit grid grid-cols-10 grid-rows-1 gap-2 p-1">
        {row1.map((_, index) => (
          <div
            key={index}
            className="min-w-20 min-h-24 bg-gray-500 cursor-pointer active:scale-95 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
          >
            {row1[index]}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto w-fit grid grid-cols-9 grid-rows-1 gap-2 p-1">
        {row2.map((_, index) => (
          <div
            key={index}
            className="min-w-20 min-h-24 bg-gray-500 cursor-pointer active:scale-95 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
          >
            {row2[index]}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto w-fit grid grid-cols-9 grid-rows-1 gap-2 p-1">
        {row3.map((_, index) => (
          <div
            key={index}
            className="min-w-20 min-h-24 bg-gray-500 cursor-pointer active:scale-95 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
          >
            {row3[index]}
          </div>
        ))}
      </div>
    </section>
  );
}

export default App
