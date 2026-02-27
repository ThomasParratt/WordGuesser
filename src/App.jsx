import GuessInFive from './components/GuessInFive'
import Clock from './components/Clock'
import { useState } from 'react'

export default function App() {
  const [game, setGame] = useState("guess");
  const handleChange = (e) => {
    setGame(e.target.value);
  }
  return (
    <>
      <label>Choose game mode: </label>
      <select value={game} onChange={handleChange}>
        <option value="guess">Guess in 6</option>
        <option value="timed">Against the clock</option>
      </select>
      {game === "guess" && <GuessInFive />}
      {game === "timed" && <Clock />}
    </>
  )
}