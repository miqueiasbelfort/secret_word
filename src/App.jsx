//hooks
import { useState, useCallback, useEffect } from 'react'
//css
import './App.css'
//data
import {wordsList} from "./data/words"

import StartScreen from './components/StartScreen'

function App() {

  return (
    <div className="App">
      <StartScreen />
    </div>
  )
}

export default App
