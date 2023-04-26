import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ArrowsIcons } from './components/Icons'
import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { LanguageSelector } from './components/LanguageSelector'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
       <LanguageSelector onChange={setFromLanguage}/>
       {fromLanguage}
        </Col>

        <Col>
        <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
          <ArrowsIcons/>
        </Button>
        </Col>

        <Col>
       <LanguageSelector onChange={setToLanguage}/>
       {toLanguage}
        </Col>
      </Row>
      </Container>
  )
}

export default App
