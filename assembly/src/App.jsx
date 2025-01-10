import Word from "./Word";
import Letters from "./Letter";
import { words, lettersArray } from "./words.js";
import { useState } from "react";

function chooseRandWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export default function App() {
  const [word, setWord] = useState(chooseRandWord());
  const [letterObj, setLetterObj] = useState(genratLetterObject());
  const [displayedLetters, setDisplayedLetters] = useState(Array(word.length).fill(''));

  function getCharIndex(letter) {
    const indexes = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i].toLowerCase() === letter.toLowerCase()) {
        indexes.push(i);
      }
    }
    console.log(`Indexes for letter "${letter}":`, indexes);
    return indexes;
  }

  console.log(word);

  function genratLetterObject() {
    return lettersArray.map(letter => ({
      value: letter,
      isChosen: false,
      isFalse: false
    }));
  }

  const LettersEl = letterObj.map(letter => (
    <Letters 
      key={letter.value} 
      value={letter.value}
      isChosen={letter.isChosen}
      isFalse={letter.isFalse}
      chose={() => checkLeter(letter.value)}
    />
  ));

  function updateDisplayedLetters(letter) {
    const indexes = getCharIndex(letter);
    console.log(indexes);
    indexes.forEach(index => {
      setDisplayedLetters(prevDisplayed => {
        const newDisplayed = [...prevDisplayed];
        newDisplayed[index] = letter;
        return newDisplayed;
      });
    });
  }

  function checkLeter(letter) {
    setLetterObj(prevLetterObj => {
      const updatedLetterObj = prevLetterObj.map(obj => {
        if (obj.value === letter) {
          if (word.includes(letter.toLowerCase())) {
            updateDisplayedLetters(letter)
            return {
              ...obj,
              isChosen: true
            };
          } else {
            return {
              ...obj,
              isFalse: true
            };
          }
        } else {
          return obj;
        }
      });
      console.log(displayedLetters);
      return updatedLetterObj;
    });
  }

  const spanEl = displayedLetters.map((letter, index) => (
    <Word key={index} letter={letter} />
  ));

  return (
    <>
      <section>
        {spanEl}
      </section>
      <div className="letters">
        {LettersEl}
      </div>
    </>
  );
}