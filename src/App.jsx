import GuessInFive from './components/GuessInFive'
import Clock from './components/Clock'
import { useState } from 'react'

export default function App() {
  const [game, setGame] = useState("");
  const [modeSelected, setModeSelected] = useState(false);

  const handleChange = (e) => {
    setGame(e.target.value);
    setModeSelected(true);
  };

  return (
    <>
      {!modeSelected && (
        <div className="w-full flex justify-center pt-8">
          <div className="bg-white px-6 py-4 rounded-xl shadow-md flex items-center gap-4">
            
            <label className="text-gray-700 font-medium">
              Choose game mode:
            </label>

            <select
              value={game}
              onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select...</option>
              <option value="guess">Guess in 6</option>
              <option value="timed">Against the clock</option>
            </select>

          </div>
        </div>
      )}
      {game === "guess" && <GuessInFive />}
      {game === "timed" && <Clock />}
    </>
  )
}