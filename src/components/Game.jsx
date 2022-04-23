import React, { useState, useRef } from 'react'
//css
import "./Game.css"

const Game = (
  {
    verifyLetter, 
    pickedWord, 
    pickedCategory,
    letters,
    guessedLetter,
    wrongLetters,
    guesses,
    score,
    retry,
    color
  }
) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  function handelSubmit(e){
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus()
  }

  return (
    <div className='game'>
       <p className='points'>
         <span>Pontuação: {score}</span>
       </p>
       <h1>Adivinhe a palavra</h1>
       <p className="back" onClick={retry}>Sair</p>
       <h3 className='tip'>
          Dica sobre a palavra: <span>{pickedCategory}</span>
       </h3>
       <p>Você ainda tem {guesses} tentativas(s).</p>
       <div className={`wordContainer ${color}`}>
         {letters.map((letter, i) => (
           guessedLetter.includes(letter) ? (
            <span key={i} className='letter'>{letter}</span>
           ) : (
             <span key={i} className="blankSquare"></span>
           )
         ))}
       </div>
       <div className='letterContainer'>
          <p>Tente adivinhar uma letra da palavra:</p>
          <form onSubmit={handelSubmit}>
            <input 
              type="text" 
              name="letter" 
              maxLength="1" 
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar</button>
          </form>
       </div>
       <div className='wrongLettersContainer'>
          <p>Letras ultilizadas</p>
          {wrongLetters.map((letter, i) => (
            <span className="wrongLetter" key={i}>{letter}, </span>
          ))}
       </div>
    </div>
  )
}

export default Game
