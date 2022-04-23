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

  const [color, setColor] = useState("")
  
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetter, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
const [score, setScore] = useState(0)

  const pickWordAndCatogory = useCallback(() => {
    //picl a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    //console.log(word)
    return {word, category}
  }, [words])

  // start the secret word game
  const startGame = useCallback(() => {
    //clear all letter
    clearLetterStates()
    setColor("")
    
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
  }, [pickWordAndCatogory])
  
  // processthe letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase()
    //check if letter has already been utilized
    if(guessedLetter.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
      setColor("right")
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses(actualGuesses => actualGuesses - 1)
      setColor("wrong")
    }

  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check if guesses ended
  useEffect(() => {

    if(guesses <= 0) {
      clearLetterStates()

      setGameStage(stages[2].name)
    }

  }, [guesses])
  
  //check wn condition
  useEffect(() => {

    const uniqueLetters = [... new Set(letters)]
    //console.log(uniqueLetters) ['o','v'] = ovo

    //win condition
    if(guessedLetter.length === uniqueLetters.length){
      //add socre
      setScore(actualScore => actualScore += 100)

      //restart game with new word
      startGame()
    }

  }, [guessedLetter, letters, startGame, setScore])

  const retry = () => {
    setScore(0)
    setGuesses(3)
    
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
        retry={retry}
        color={color}
      />}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  )
}

export default App
