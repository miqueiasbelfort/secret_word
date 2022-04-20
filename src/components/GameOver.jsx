import React from 'react'
//css
import "./GameOver.css"

const GameOver = ({retry}) => {
  return (
    <div>
      <h1>Game End</h1>
      <button onClick={retry}>Reiniciar</button>
    </div>
  )
}

export default GameOver