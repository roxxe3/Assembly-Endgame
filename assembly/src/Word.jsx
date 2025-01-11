/* eslint-disable react/prop-types */

export default function Word(props) {
  const isGameOver = props.lifes === 0;
  const isGuessedLetter = props.letterObj.some(
    letter => letter.value.toLowerCase() === props.letter.toLowerCase() && letter.isChosen
  );
  const isUnguessedLetter = !isGuessedLetter && props.letter !== '';

  return (
    <span
      style={{
        color: (isGameOver && isUnguessedLetter) ? "#EC5D49" : "#F9F4DA"
      }}
      className="hiddenletter"
    >
      {isGameOver ? props.letter.toUpperCase() : props.letter}
    </span>
  );
}