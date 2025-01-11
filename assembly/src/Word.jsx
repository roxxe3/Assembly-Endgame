/* eslint-disable react/prop-types */

export default function Word(props){
      const reveal = props.letterObj.map(letter => {
        if (!letter.isChosen && props.life === 0){
          return true
        }
        else {
          return false
        }
      })
  return (
      <span style={{
        color: reveal ? "#EC5D49" : "#F9F4DA"
      }} className="hiddenletter">{props.letter}</span>
  )
}