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
                <Container className='sampleQuestions'>
                    <Row>
                        {[ "What's the purpose of life?","What is 9.26?", "What is Karma Yoga?", "What is the soul?"].map((elm, i) => {
                            return (

                                <Col  key={i} sm>
                                    <Card  style={{height:"10rem", marginBottom:"0.5rem"}}  onClick={() => inputText.current.value = elm} bg={darkTheme == true ? "dark" : "light"} className="card">
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
            {/* <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <h4>About Us</h4>
        <p>Free Open Gita AI 😀📔 available to anyone!</p>
        
      </div>
      <div className="col-md-4">
        <h4>Contact Me</h4>
        <p>Get in touch with me for any questions or concerns.</p>
        <a id="fa" href="https://www.linkedin.com/in/damodar-kamani-a7204123a/" target="_blank"><i className="fa fa-linkedin-square" style={{fontSize:"30px"}}></i></a>
        <a id="fa" href="https://github.com/dudeunoob" target="_blank"><i className="fa fa-github" style={{fontSize:"30px"}}></i></a>
      </div>
      <div className="col-md-4">
        <h4>Follow Us</h4>
        <p>Stay updated with our latest news and events.</p>
      </div>
    </div>
    <div className="row">
      <p className="copyright">Copyright © 2023 All rights reserved.</p>
    </div>
  </div>
</footer> */}

<footer>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <h5>About Me/This</h5>
        <p>In February of 2023 I decided to make a website </p>
        <p>dedicated to a free open Gita AI 📔</p>
        <p><b>Created by: <a href="https://github.com/DudeUnoob" target={"_blank"}>@dom✌</a></b></p>
      </div>
      <div class="col-md-4">
        <h5>Check Me Out!</h5>
        <p><i class="fa fa-linkedin" ></i> <a href="https://www.linkedin.com/in/damodar-kamani-a7204123a/" target={"_blank"}>Linkedin</a></p>
        <p><i class="fa fa-github" style={{paddingRight:"5px"}}></i><a href="https://github.com/DudeUnoob" target={"_blank"}>Github</a></p>
        <p><i class="fa fa-envelope"></i> techdomprogramming@gmail.com</p>
      </div>
      <div class="col-md-4">
        <h5>Follow Me</h5>
        {/* <a href="#"><i class="fa fa-facebook-square fa-2x"></i></a> */}
        <a href="https://twitter.com/DudeUnoob69" target={"_blank"}><i class="fa fa-twitter-square fa-2x"></i></a>
        <a href="https://www.instagram.com/damodar_kamanii/" target={"_blank"}><i class="fa fa-instagram fa-2x"></i></a>
      </div>
    </div>
    <hr />
    <p class="text-center">Copyright © 2023 Gita GPT</p>
  </div>
</footer>

            
        </>
    )
}