import Word from "./Word"
import Letters from "./Letter"
import {words , lettersArray} from "./words.js"
import { useState } from "react"

function chooseRandWord(){
  return words[Math.floor(Math.random() * words.length)]
}

export default function App(){
  const [word, setWord] = useState(chooseRandWord())
  const [letterObj, setLetterObj] = useState(genratLetterObject())

  function genratLetterObject(){
    return lettersArray.map(letter => ({
      value: letter,
      isChosen: false,
      isFalse: false
    }))
  }

  const LettersEl = letterObj.map(letter => 
                <Letters 
                        key={letter.value} 
                        value={letter.value}
                        isChosen ={letter.isChosen}
                        isFalse = {letter.isFalse}
                        chose={()=> checkLeter(letter.value)}
                  />)

function checkLeter(letter) {
    setLetterObj(prevLetterObj => {
        const updatedLetterObj = prevLetterObj.map(obj => {
            if (obj.value === letter) {
                if (word.includes(letter.toLowerCase())) {
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
                      return updatedLetterObj;
                    });
}

const spanEl = []
for(let i= 0 ; i < word.length; i++){
    spanEl.push(<Word key={i} letter={word[i].toUpperCase()}  />)
}


  return (
    <>
    <section>
      {spanEl}
    </section>
      <div className="letters">
        {LettersEl}
      </div>
      </>
  )
}