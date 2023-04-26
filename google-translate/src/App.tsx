import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useReducer } from 'react'
import { type Action } from './types'

const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer (state: typeof initialState, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <h1>google translate</h1>
    </>
  )
}

export default App
