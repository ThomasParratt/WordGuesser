# React Wordle

React Wordle is a small Wordle-inspired game built with React, Vite, and Tailwind CSS. It includes two play modes:

- `Guess in 6`, a standard Wordle-style mode with six attempts.
- `Against the clock`, a timed mode that tracks how long it takes to solve the word.

The project uses local word lists in `src/assets/answers.json` and `src/assets/words.json`, and it supports both keyboard input and on-screen input. It is a frontend-only app, which makes it a focused demo of component state, event handling, and game logic.

## Features

- Random daily-style word selection from a local answer list.
- Green, orange, and gray tile feedback for each guess.
- Keyboard coloring that reflects discovered letter states.
- Animated tile flipping, shaking, and win bounce effects.
- Mode selection screen for switching between normal and timed play.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Project Structure

- `src/App.jsx` selects the game mode.
- `src/components/GuessInFive.jsx` contains the six-attempt game logic.
- `src/components/Clock.jsx` contains the timed game logic.
- `src/assets/answers.json` stores valid answers.
- `src/assets/words.json` stores the accepted guess list.
