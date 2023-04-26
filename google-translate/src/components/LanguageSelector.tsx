import { Form } from 'react-bootstrap'
import { SUPPORTED_LANGUAGES } from '../constants'
import { type Language } from '../types'

interface Props {
  onChange: (language: Language) => void
  value: string
}

export const LanguageSelector: React.FC<Props> = ({ onChange, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }

  return (
        <Form.Select aria-label='Select Language' onChange={handleChange} value={value}>
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>{literal}</option>
            ))}
        </Form.Select>
  )
}
