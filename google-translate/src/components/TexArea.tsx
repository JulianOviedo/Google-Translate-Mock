import { Form } from 'react-bootstrap'

interface Props {
  autoFocus?: boolean
  loading?: boolean
  onChange: (value: string) => void
  value: string
  type: string
}

const commonStyles = { border: 0, height: '200px' }

const getPlaceholder = ({ type, loading }: { type: string, loading?: boolean }) => {
  if (type === 'from') return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea = ({ autoFocus, loading, value, onChange, type }: Props) => {
  const styles = type === 'from'
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
        <Form.Control autoFocus={autoFocus}
            as='textarea'
            placeholder={getPlaceholder({ type, loading })}
            value={value}
            type={type}
            style={styles}
            onChange={handleChange}
            />
  )
}
