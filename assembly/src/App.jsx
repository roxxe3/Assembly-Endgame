import Word from "./Word";
import Letters from "./Letter";
import { words, lettersArray } from "./words.js";
import { useState } from "react";
import { languages } from "./languages.js";

function chooseRandWord() {
  return words[Math.floor(Math.random() * words.length)];
}


function genratLetterObject() {
  return lettersArray.map(letter => ({
    value: letter,
    isChosen: false,
    isFalse: false
  }));
}



export default function App() {
  const [word, setWord] = useState(chooseRandWord());
  console.log(word);
  const [letterObj, setLetterObj] = useState(genratLetterObject());
  const [displayedLetters, setDisplayedLetters] = useState(Array(word.length).fill(''));
  const [lifes, setLife] = useState(8)
 
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
  
  function checkLeter(letter) {
    setLetterObj(prevLetterObj => {
      const updatedLetterObj = prevLetterObj.map(obj => updateLetterObject(obj, letter, word));
      
      if(lifes === 0) {
        console.log("You lost")
      }

      return updatedLetterObj;
    });
  }
  function gameOver(){
      const restofLetters = word.map(x => {
        if(!displayedLetters.includes(x)){
          return getCharIndex(x)
        }
      })
      console.log(restofLetters)
    
    return lifes === 0 ? true : false
  }

  function startNewGame() {
    const newWord = chooseRandWord();
    setWord(newWord);
    setLetterObj(genratLetterObject());
    setDisplayedLetters(Array(newWord.length).fill(''));
    setLife(8);
    console.log(newWord);
    
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
        setLife(lifes - 1)
        console.log(lifes)
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
    indexes.forEach(index => {
      setDisplayedLetters(prevDisplayed => {
        const newDisplayed = [...prevDisplayed];
        newDisplayed[index] = letter;
        return newDisplayed;
      });
    });
  }


  const spanEl = displayedLetters.map((letter, index) => (
    <Word key={index} letter={letter} lifes={lifes} letterObj={letterObj} word={word}/>
  ));

  return (
    <>
    <header>
      <h1>Assembly: Endgame</h1>
      <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      {gameOver() && 
      <div className="gameover">
      <h2>Game Over !</h2>
      <p>You lose! Better start learning Assembly 😭</p>
      </div>}
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