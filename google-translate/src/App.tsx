import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { ArrowsIcons } from './components/Icons'
import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TexArea'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App () {
  const { loading, result, fromText, fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage, setResult, setFromText } = useStore()

  useEffect(() => {
    if (fromText === '') return

    translate({ text: fromText, fromLanguage, toLanguage })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(error => {
        console.error(error)
        setResult(error.message)
      })
  }, [fromText])

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
            <ArrowsIcons />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>

            <LanguageSelector onChange={setToLanguage} value={toLanguage} />
            <TextArea value={result} onChange={setResult} type='to' loading={loading}/>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
