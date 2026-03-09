import { useState } from 'react'
import back from '../assets/back.svg'
import answers from "../assets/answers.json";
import words from "../assets/words.json";

function getRandomWordArray() {
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex]
    .toUpperCase()
    .split("");
}

function wordExists(charArray) {
  let word = charArray.join('');
  word = word.toLowerCase();
  console.log(word);
  return words.includes(word);
}

const answer = getRandomWordArray();

export default function GuessInFive() {
    const squares = Array.from({ length: 30 });
    const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];

    const [typed, setTyped] = useState("");
    const [activeGreen, setGreen] = useState([]);
    const [activeOrange, setOrange] = useState([]);
    const [activeGray, setGray] = useState([]);
    const [chars, setChars] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [tileResults, setTileResults] = useState(Array(30).fill(null));
    const [win, setWin] = useState(false);
    const [notWord, setNotWord] = useState(false);
    const [message, setMessage] = useState("Genius");

    const [flippingRow, setFlippingRow] = useState(null);
    const [shakingRow, setShakingRow] = useState(null);
    const [bouncingRow, setBouncingRow] = useState(null);

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
        setNotWord(false);
        //if (typed.length === 5) // GETTING THERE!!
        //    setTyped("");
        console.log("attempts: " + attempts);
        if (win || attempts >= 6)
            return ;
        if (chars === 5 && index - 19 === 0) // ENTER
        {
            console.log("typed:" + typed);
            const start = attempts * 5;
            const guess = typed.slice(start, start + 5).split("");
            if (!wordExists(guess))
            {
                console.log("Word not in list");
                setNotWord(true);
                setShakingRow(attempts);
                setTimeout(() => {
                    setShakingRow(null);
                }, 400);
                setMessage("Word not in list");
                return ;
            }
            setFlippingRow(attempts);
            setTimeout(() => {
                setFlippingRow(null);
            }, 1200);
            console.log(answer);
            console.log(guess);
            if (guess.join("") === answer.join("")) {
                setWin(true);
                setFlippingRow(attempts);

                // Wait for flip to finish before bouncing
                setTimeout(() => {
                    setFlippingRow(null);
                    setBouncingRow(attempts);
                    setTimeout(() => setBouncingRow(null), 1000);
                }, 1200); // match your flip total duration
                switch (attempts) {
                case 1:
                    setMessage("Magnificent");
                    break;
                case 2:
                    setMessage("Impressive");
                    break;
                case 3:
                    setMessage("Splendid");
                    break;
                case 4:
                    setMessage("Great");
                    break;
                case 5:
                    setMessage("Phew");
                    break;
                default:
                    console.log("Unknown");
                }
                console.log("WELL DONE!");
            }
            else if (attempts === 5)
            {
                setWin(true);
                setMessage(answer);
            }
            const result = evaluateGuess(guess);
            // Update tile results
            const newTileResults = [...tileResults];
            result.forEach((r, i) => {
                newTileResults[start + i] = r;
            });
            result.forEach((r, i) => {
                setTimeout(() => {
                setTileResults(prev => {
                    const updated = [...prev];
                    updated[start + i] = r;
                    return updated;
                });
                }, i * 150 + 300); // half flip timing
            });

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
            setTimeout(() => {
                setGreen(newGreen);
                setOrange(newOrange);
                setGray(newGray);
            }, 1200);
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
        <div className="w-full flex justify-center pt-16 md:pt-20 pb-6 md:pb-12">
            <div className="grid grid-cols-5 gap-1">
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
                    style={
                    flippingRow === Math.floor(index / 5)
                        ? { animationDelay: `${(index % 5) * 150}ms` }
                        : bouncingRow === Math.floor(index / 5)
                        ? { animationDelay: `${(index % 5) * 100}ms` }
                        : {}
                    }
                    className={`
                        min-h-14 md:min-h-20 aspect-square flex items-center justify-center 
                        text-3xl md:text-4xl font-bold 
                        ${bgClass}
                        ${flippingRow === Math.floor(index / 5) ? "animate-flip" : ""}
                        ${shakingRow === Math.floor(index / 5) ? "animate-shake" : ""}
                        ${bouncingRow === Math.floor(index / 5) ? "animate-bounceTile" : ""}
                    `}
                >
                    {letter}
                </div>
                );
            })}
            </div>
        </div>
        {(win || notWord) && (
            <article className={"absolute top-12 left-1/2 z-10 w-fit rounded-md bg-gray-800 text-white text-center text-sm md:text-2xl font-semibold p-3 md:p-4 -translate-x-1/2 -translate-y-1/2"}>{message}</article>
        )}
        <div className="max-w-4xl mx-auto w-full justify-center flex gap-2 p-1">
            {alphabet.slice(0, 10).map((value, index) => {
            let bgClass = "bg-gray-300 text-black";
            if (activeGreen.includes(index)) bgClass = "bg-green-600 text-white";
            else if (activeOrange.includes(index)) bgClass = "bg-amber-400 text-white";
            else if (activeGray.includes(index)) bgClass = "bg-gray-600 text-white";
            return (
                <div key={index} onClick={() => handleClick(value, index)}
                className={`min-w-7 min-h-16 md:min-w-10 md:min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center text-xl md:text-2xl font-bold ${bgClass}`}>
                {value}
                </div>
            );
            })}
        </div>
        <div className="max-w-4xl mx-auto w-full justify-center flex gap-2 p-1">
            {alphabet.slice(10, 19).map((value, index) => {
            let bgClass = "bg-gray-300 text-black";
            if (activeGreen.includes(index + 10)) bgClass = "bg-green-600 text-white";
            else if (activeOrange.includes(index + 10)) bgClass = "bg-amber-400 text-white";
            else if (activeGray.includes(index + 10)) bgClass = "bg-gray-600 text-white";
            return (
                <div key={index + 10} onClick={() => handleClick(value, index + 10)}
                className={`min-w-7 min-h-16 md:min-w-10 md:min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center text-xl md:text-2xl font-bold ${bgClass}`}>
                {value}
                </div>
            );
            })}
        </div>
        <div className="max-w-4xl mx-auto w-full justify-center flex gap-2 p-1">
            {alphabet.slice(19, 28).map((value, index) => {
            let bgClass = "bg-gray-300 text-black";
            if (activeGreen.includes(index + 19)) bgClass = "bg-green-600 text-white";
            else if (activeOrange.includes(index + 19)) bgClass = "bg-amber-400 text-white";
            else if (activeGray.includes(index + 19)) bgClass = "bg-gray-600 text-white";
            return (
                <div key={index} onClick={() => handleClick(value, index + 19)}
                className={`min-h-16 md:min-h-20 cursor-pointer active:bg-gray-400 rounded-md flex items-center justify-center font-bold ${
                    index === 0 || index === 8
                    ? "min-w-12 md:min-w-16 text-sm md:text-base"
                    : "min-w-7 md:min-w-10 text-xl md:text-2xl"
                } ${bgClass}`}>
                {index === 8 ? <img src={back} alt="Back" className="w-7 h-7" /> : value}
                </div>
            );
            })}
        </div>
        </section>
    );
}