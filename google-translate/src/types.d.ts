export type Action =
| { type: 'SET_FROM_LANGUAGE', payload: string }
| { type: 'SET_TO_LANGUAGE', payload: string }
| { type: 'INTERCHANGE_LANGUAGES' }
| { type: 'SET_RESULT', payload: string }
| { type: 'SET_FROM_TEXT', payload: string }
