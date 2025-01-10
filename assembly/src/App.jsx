import Word from "./Word";
import Letters from "./Letter";
import { words, lettersArray } from "./words.js";
import { useState } from "react";
import { languages } from "./languages.js";

function chooseRandWord() {
  return words[Math.floor(Math.random() * words.length)];
}




export default function App() {
  const [word, setWord] = useState(chooseRandWord());
  const [letterObj, setLetterObj] = useState(genratLetterObject());
  const [displayedLetters, setDisplayedLetters] = useState(Array(word.length).fill(''));
  const languagesEl = languages.map(language => <span className="language" key={language.name} style={{backgroundColor: language.backgroundColor,
    color: language.color
  }}>{language.name}</span>)



  function getCharIndex(letter) {
    const indexes = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i].toLowerCase() === letter.toLowerCase()) {
        indexes.push(i);
      }
    }
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
  
  function checkLeter(letter) {
    setLetterObj(prevLetterObj => {
      const updatedLetterObj = prevLetterObj.map(obj => updateLetterObject(obj, letter, word));
      return updatedLetterObj;
    });
  }

  function updateLetterObject(obj, letter, word) {
    if (obj.value === letter) {
      if (word.includes(letter.toLowerCase())) {
        updateDisplayedLetters(letter);
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
    }
    return obj;
  }

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


  const spanEl = displayedLetters.map((letter, index) => (
    <Word key={index} letter={letter} />
  ));

  return (
    <>
    <header>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
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
    </>
  );
}