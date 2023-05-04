import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TexArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebouce } from './hooks/useDebounce'

function App () {
  const { loading, result, fromText, fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage, setResult, setFromText } = useStore()

  const debouncedFromText = useDebouce(fromText)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ text: debouncedFromText, fromLanguage, toLanguage })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(error => {
        console.error(error)
        setResult(error.message)
      })
  }, [debouncedFromText])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector onChange={setFromLanguage} value={fromLanguage} />
            <TextArea value={fromText} onChange={setFromText} autoFocus type='from'/>
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>

            <LanguageSelector onChange={setToLanguage} value={toLanguage} />
            <div style={{ position: 'relative' }}>
            <TextArea
              loading={loading}
              type='to'
              value={result}
              onChange={setResult}
            />
            <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
            <Button
              variant='link'
              onClick={handleClipboard}>
                <ClipboardIcon />
            </Button>
            <Button
              variant='link'
              onClick={handleSpeak}>
                <SpeakerIcon />
            </Button>
            </div>

            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
