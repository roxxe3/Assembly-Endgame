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
      isChosen: false
    }))
  }

  const LettersEl = letterObj.map(letter => 
                <Letters 
                        key={letter.value} 
                        value={letter.value}
                        isChosen ={letter.isChosen}
                        chose={()=> checkLeter(letter.value)}
                  />)


  function checkLeter(letter){
    letterObj.map(obj => {
      if(obj.value === letter){
        return {
          ...obj,
          isChosen: true
        }
      }
    })
  }

  return (
    <>
      <Word word={word}/>
      <div className="letters">
        {LettersEl}
      </div>
      </>
  )
}