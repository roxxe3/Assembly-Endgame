import Word from "./Word";
import Letters from "./Letter";
import { words, lettersArray } from "./words.js";
import { useState } from "react";
import { languages } from "./languages.js";
import clsx from 'clsx';
import { getFarewellText } from "./utils.js";

// Function to choose a random word from the words array
function chooseRandWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Function to generate letter objects with initial states
function genratLetterObject() {
  return lettersArray.map(letter => ({
    value: letter,
    isChosen: false,
    isFalse: false
  }));
}

// Function to get the indexes of a letter in the word
function getCharIndex(word, letter) {
  const indexes = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === letter.toLowerCase()) {
      indexes.push(i);
    }
  }
  return indexes;
}

// Function to update the letter object based on the chosen letter
function updateLetterObject(obj, letter, word, updateDisplayedLetters, setLife, lifes, setFarewellMessage) {
  if (obj.value === letter) {
    if (word.includes(letter.toLowerCase())) {
      updateDisplayedLetters(letter);
      return {
        ...obj,
        isChosen: true
      };
    } else {
      setLife(lifes - 1);
      if (lifes > 1 && lifes <= 9) {
        const language = languages[8 - (lifes - 1)].name; // Get the language name based on the remaining lives
        setFarewellMessage(getFarewellText(language));
      }
      return {
        ...obj,
        isFalse: true
      };
    }
  }
  return obj;
}

export default function App() {
  const [word, setWord] = useState(chooseRandWord());
  const [letterObj, setLetterObj] = useState(genratLetterObject());
  const [displayedLetters, setDisplayedLetters] = useState(Array(word.length).fill(''));
  const [lifes, setLife] = useState(8);
  const [farewellMessage, setFarewellMessage] = useState('');

  // Generate language elements for displaying lives
  const languagesEl = languages.map((language, idx) => (
    <span
      key={language.name}
      className={clsx("language", { lost: lifes <= 7 - idx })}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color
      }}
    >
      {language.name}
    </span>
  ));

  // Generate letter elements for displaying letters
  const LettersEl = letterObj.map(letter => (
    <Letters 
      key={letter.value} 
      value={letter.value}
      isChosen={letter.isChosen}
      isFalse={letter.isFalse}
      lifes={lifes}
      chose={() => checkLeter(letter.value)}
    />
  ));

  // Generate word elements for displaying the word
  const spanEl = displayedLetters.map((letter, index) => (
    <Word key={index} letter={letter} lifes={lifes} letterObj={letterObj} word={word}/>
  ));

  // Function to check if the chosen letter is in the word
  function checkLeter(letter) {
    setLetterObj(prevLetterObj => {
      const updatedLetterObj = prevLetterObj.map(obj => updateLetterObject(obj, letter, word, updateDisplayedLetters, setLife, lifes, setFarewellMessage));
      return updatedLetterObj;
    });
  }

  // Function to check if the game is won
  function gameWon() {
    return lifes > 0 && displayedLetters.join('').toLowerCase() === word;
  }

  // Function to check if the game is over
  function gameOver() {
    if (lifes === 0) {
      const restOfLetters = word.split('').filter(x => !displayedLetters.includes(x));
      restOfLetters.forEach(letter => updateDisplayedLetters(letter));
      return true;
    }
    return false;
  }

  // Function to start a new game
  function startNewGame() {
    const newWord = chooseRandWord();
    setWord(newWord);
    setLetterObj(genratLetterObject());
    setDisplayedLetters(Array(newWord.length).fill(''));
    setLife(9);
    setFarewellMessage('');
  }

  // Function to update the displayed letters based on the chosen letter
  function updateDisplayedLetters(letter) {
    const indexes = getCharIndex(word, letter);
    indexes.forEach(index => {
      setDisplayedLetters(prevDisplayed => {
        const newDisplayed = [...prevDisplayed];
        newDisplayed[index] = letter;
        return newDisplayed;
      });
    });
  }

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 9 attempts to keep the programming world safe from Assembly!</p>
        {gameWon() &&
          <div className="gamewon">
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </div>
        }
        {gameOver() && 
          <div className="gameover">
            <h2>Game Over !</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </div>
        }
        { !gameOver() &&!gameWon() && farewellMessage && 
        <div className="bye"><h2>{farewellMessage}</h2></div>

        }
      </header>
      <div className="lifes">
        {languagesEl}
      </div>
      <section>
        {spanEl}
      </section>
      <div className="letters">
        {LettersEl}
      </div>
      {gameOver() && <button onClick={startNewGame} className="newgame">New Game</button>}
    </>
  );
}