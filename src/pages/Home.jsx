import { useState, useEffect, useRef, useContext } from 'react';
import { Button, Card, Container, Form, InputGroup, Row, Spinner, Col } from "react-bootstrap"
import { ThemeContext, ThemeProvider, useTheme, useThemeUpdate } from "../components/ThemeContext";
import { callApi } from '../functions/api';
import "../public/Home.css"


export default function Home() {
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()

    const inputText = useRef(null)
    const [messageValue, setMessageValue] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleCallGPT = async () => {
        const chatHistory = window.localStorage.getItem("chat_history")
        const message = inputText.current.value
        //[`Human: ${message}\nAI: ${data?.answer}`]
        if (chatHistory) {
            setMessageValue(null)
            setLoading(true)
            const data = await callApi(message, JSON.parse(chatHistory))

            setLoading(false)
            setMessageValue(data)
            const getStorage = JSON.parse(chatHistory)
            const messageArr = [`Human: ${message}\nAI: ${data?.answer}`]

            const finalArr = getStorage.concat(messageArr)

            window.localStorage.setItem("chat_history", JSON.stringify(finalArr))



        } else {
            setMessageValue(null)
            setLoading(true)
            const data = await callApi(message)
            setLoading(false)
            setMessageValue(data)
            window.localStorage.setItem("chat_history", JSON.stringify([`Human: ${message}\nAI: ${data?.answer}`]))
        }


    }

    const loadingStyleState = { visibility: loading == true ? "visible" : "hidden" }
    const secondLoadingStyleState = { display: loading == true ? "inline-block" : "none" }

    return (
        <>

            <div className="heading">
                <h1>Welcome to Gita GPT! 😀</h1>
                <p>Ask any question related to the bhagavad gita! ex: Verses, Krishna, Arjuna, etc...</p>

            </div>
            <br />
            <br />
            <div className="card_body">


                <InputGroup className="mb-3" placeholder='Ask a question!' id="input_question">

                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder='Ask any question related to the bhagavad gita!'
                        ref={inputText}
                        required
                        onKeyDown={(e) => e.code == "Enter" ? handleCallGPT() : ""}
                    />
                    <Button id="button-addon1" onClick={handleCallGPT} disabled={loading} variant={darkTheme == true ? "dark" : "primary"}>
                        Send
                    </Button>

                </InputGroup>

                <div className="answers">
                    <div className="loadingState">
                        <Spinner animation='border' role={"status"} style={secondLoadingStyleState}>
                            <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                    </div>
                    <p id="answer_result"><b>{messageValue?.answer}</b></p>
                </div>
                <br />
                <br />
                <h2 style={{ display: "inline-block" }}>Example Questions</h2>
                <br />
                <br />
                <Container className="sampleQuestions" >
                    <Row>
                        {["What is the purpose of life?", "What is 9.26?", "What is Karma Yoga?", "What is the soul?"].map((elm, i) => {
                            return (

                                <Col key={i} lg="auto">
                                    <Card onClick={() => inputText.current.value = elm} bg={darkTheme == true ? "dark" : "light"} >
                                        <Card.Body>
                                            <Card.Title style={{color: darkTheme == true ? "white" : "black"}}>{elm}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )

                        })}
                    </Row>
                </Container>
            </div>
        </>
    )
}