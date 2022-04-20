import React from 'react'
//css
import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique no botão para jogar</p>
        <button onClick={startGame}>Start Game</button>
    </div>
  )
}

export default StartScreen