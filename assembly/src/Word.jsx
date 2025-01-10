/* eslint-disable react/prop-types */

export default function Word(props){
  console.log(props.word)
  const spanEl = []
  for(let i= 0 ; i < props.word.length; i++){
      spanEl.push(<span className="hiddenletter" key={i}>{props.word[i].toUpperCase()}</span>)
  }

  return (
    <section>
    {spanEl}
    </section>
  )
}