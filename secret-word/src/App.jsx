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
const guessQty = 5;
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [pickedCategory, setPickedCategory] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessQty);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const pickWordAndCategory = useCallback(() => {
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
  }, [words]);
  // starts game
  const startGame = useCallback(() => {
    // clear all letters
    setGameWon(false);
    clearLetterStates();
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
  }, [pickWordAndCategory]);
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
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };
  // check if no more guesses
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);
  // check win condition
  useEffect(() => {
    if (!gameWon) {
      const uniqueLetters = [...new Set(letters)];
      if (
        uniqueLetters.length > 0 &&
        guessedLetters.length === uniqueLetters.length
      ) {
        setGameWon(true);
        setScore((prev) => prev + 100);

        setTimeout(() => {
          startGame();
        }, 500);
      }
    }
  }, [guessedLetters, letters, startGame, gameWon]);
  // restart game
  const retry = () => {
    setScore(0);
    setGuesses(guessQty);
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
        {gameStage == "end" && <GameOver retry={retry} score={score} />}
      </div>
    </>
  );
}

export default App;
