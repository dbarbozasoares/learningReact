/* eslint-disable no-unused-vars */
// CSS
import "./App.css";
// React
import { useCallback, useEffect, useState } from "react";
// Data
import { wordsList } from "./data/words";
// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [pickedCategory, setPickedCategory] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category =
      // pick random category
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);
    // pick random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);
    return { word, category };
  };
  // starts game
  const startGame = () => {
    //pick word and pick category
    const { word, category } = pickWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((t) => t.toLowerCase());
    console.log(wordLetters);

    // Fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };
  // process each letter from input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or decrease a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
    }
    console.log(guessedLetters);
    console.log(wrongLetters);
  };
  // restart game
  const retry = () => {
    setGameStage(stages[0].name);
  };
  return (
    <>
      <div className="App">
        {gameStage == "start" && <StartScreen startGame={startGame} />}
        {gameStage == "game" && (
          <Game
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />
        )}
        {gameStage == "end" && <GameOver retry={retry} />}
      </div>
    </>
  );
}

export default App;
