//hooks
import { useState, useCallback, useEffect } from 'react'
//css
import './App.css'
//data
import {wordsList} from "./data/words"

//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'


const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetter, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
const [score, setScore] = useState(0)

  const pickWordAndCatogory = () => {
    //picl a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    //console.log(word)
    return {word, category}
  }

  // start the secret word game
  const startGame = () => {
    
    // pick word and pick catgory
    const {word, category} = pickWordAndCatogory()
    
    // create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map(letter => letter.toLowerCase())
    //console.log(wordLetters)

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }
  
  // processthe letter input
  const verifyLetter = (letter) => {
    console.log(letter)
  }
  
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetter={guessedLetter}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  )
}

export default App
