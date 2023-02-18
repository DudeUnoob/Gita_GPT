import { useState, useEffect, useRef, useContext } from 'react';
import { Button, Card, Container, Form, InputGroup, Row, Spinner, Col, Modal } from "react-bootstrap"
import { ThemeContext, ThemeProvider, useTheme, useThemeUpdate } from "../components/ThemeContext";
import { callApi } from '../functions/api';
import "../public/Home.css"



export default function Home() {
  const darkTheme = useTheme()
  const toggleTheme = useThemeUpdate()
  const [show, setShow] = useState(false)

  const inputText = useRef(null)
  const [messageValue, setMessageValue] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCallGPT = async () => {
    const chatHistory = window.localStorage.getItem("chat_history")
    const chatScrollHistory = window.localStorage.getItem("scrolling_chat_history")
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
      const testScrollingObj = {
        chat: {
          Human: message,
          AI: data?.answer
        }
      }
      const scrollingChatObj = [
        testScrollingObj
      ]

      const finalScrollingChatArr = JSON.parse(chatScrollHistory).concat(scrollingChatObj)
      const finalArr = getStorage.concat(messageArr)

      window.localStorage.setItem("scrolling_chat_history", JSON.stringify(finalScrollingChatArr))
      window.localStorage.setItem("chat_history", JSON.stringify(finalArr))



    } else {
      setMessageValue(null)
      setLoading(true)
      const data = await callApi(message)
      setLoading(false)
      setMessageValue(data)
      const testScrollingObj = {
        chat: {
          Human: message,
          AI: data?.answer
        }
      }
      window.localStorage.setItem("chat_history", JSON.stringify([`Human: ${message}\nAI: ${data?.answer}`]))
      window.localStorage.setItem("scrolling_chat_history", JSON.stringify(
        [testScrollingObj]
      ))
    }


  }

  


  const handleModalShow = () => {
    setShow(true)
  }

  const handleModalClose = () => {
    setShow(false)

  }

  const handleChatTrash = () => {
    window.localStorage.removeItem("chat_history")
    window.localStorage.removeItem("scrolling_chat_history")
    setShow(false)
  }

  useEffect(() => {

    const element = document.getElementById("scrollable")
    element.scrollTop = element.scrollHeight;

  }, [messageValue])

  const getStorage = JSON.parse(window.localStorage.getItem("scrolling_chat_history"))

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


        {/* <InputGroup className="mb-3" placeholder='Ask a question!' id="input_question">
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
        </div> */}



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
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Chat Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your chat history?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleChatTrash}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="containerScroll" style={{ backgroundColor: darkTheme == true ? "#333" : "white" }}>
        <Button id="trash-icon" onClick={handleModalShow} style={{color: darkTheme==true ? "white" : "#333"}}><i className='fa fa-trash' aria-hidden="true" style={{ fontSize: "18px" }}></i></Button>
        <div className="scrollable" id="scrollable" style={{ backgroundColor: darkTheme == true ? "#333" : "white" }}>
          {
            getStorage == null ? <div className='chat-container' style={{ height: "220px" }}></div>
              : getStorage.length == 1 ? <div className='chat-container' style={{ height: "220px"}}>
                
                <div className="chat-message human_chat">
                  <p className='message'>{getStorage[0].chat.Human}</p>
                </div>
                <div className='chat-message ai_chat'>
                  <p className='message'>{getStorage[0].chat.AI}</p>
                </div>
              </div> : getStorage?.map((elm, i) => {
                return (
                  <div key={i} className="chat-container">
                    <div className='chat-message human_chat'>
                      <p className='message'>{elm.chat.Human}</p>
                    </div>
                    <div className="chat-message ai_chat">
                      <p className='message'>{elm.chat.AI}</p>
                    </div>

                  </div>
                )
              })}
          <InputGroup className="mb-3" placeholder='Ask a question!' id="input_question" style={{ position: "sticky", bottom: "0", top: "0" }}>

            <Form.Control
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Ask any question related to the bhagavad gita!'
              ref={inputText}
              required
              onKeyDown={(e) => e.code == "Enter" ? handleCallGPT() : ""}
            />
            <Button id="button-addon1" onClick={handleCallGPT} disabled={loading} variant={darkTheme == true ? "dark" : "primary"}>
              {loading == true ? <Spinner animation='border' role={"status"} style={secondLoadingStyleState}
                size="sm"
              >
                <span className='visually-hidden'>Loading...</span>
              </Spinner> : "Send"}
            </Button>

          </InputGroup>

        </div>
      </div>
      <br />
      <h2 style={{ textAlign: "center" }}>Example Questions</h2>
      <br />
      <br />
      <Container className='sampleQuestions'>
        <Row>
          {["What's the purpose of life?", "What is 9.26?", "What is Karma Yoga?", "What is the soul?"].map((elm, i) => {
            return (

              <Col key={i} sm>
                <Card style={{ height: "10rem", marginBottom: "0.5rem" }} onClick={() => inputText.current.value = elm} bg={darkTheme == true ? "dark" : "light"} className="card">
                  <Card.Body>
                    <Card.Title style={{ color: darkTheme == true ? "white" : "black" }}>{elm}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>

            )

          })}
        </Row>
      </Container>

      <footer style={{ backgroundColor: darkTheme == true ? "#333" : "white", color: darkTheme == true ? "white" : "black", borderTop: darkTheme == true ? "" : "1px solid" }}>
        <div className="container" style={{ backgroundColor: darkTheme == true ? "#333" : "white", color: darkTheme == true ? "white" : "black" }}>
          <div className="row" style={{ color: darkTheme == true ? "white" : "black" }}>
            <div className="col-md-4" style={{ color: darkTheme == true ? "white" : "black" }}>
              <h5>About Me/This</h5>
              <p>In February of 2023 I decided to make a website </p>
              <p>dedicated to a free open Gita AI 📔</p>
              <p><b>Created by: <a href="https://github.com/DudeUnoob" target={"_blank"} style={{ color: darkTheme == true ? "white" : "black" }}>@dom✌</a></b></p>
            </div>
            <div className="col-md-4" style={{ color: darkTheme == true ? "white" : "black" }}>
              <h5>Check Me Out!</h5>
              <p><i className="fa fa-linkedin" ></i> <a href="https://www.linkedin.com/in/damodar-kamani-a7204123a/" target={"_blank"} style={{ color: darkTheme == true ? "white" : "black" }}>Linkedin</a></p>
              <p><i className="fa fa-github" style={{ paddingRight: "5px" }}></i><a href="https://github.com/DudeUnoob" target={"_blank"} style={{ color: darkTheme == true ? "white" : "black" }}>Github</a></p>
              <p><i className="fa fa-envelope"></i> techdomprogramming@gmail.com</p>
            </div>
            <div className="col-md-4" style={{ color: darkTheme == true ? "white" : "black" }}>
              <h5>Follow Me</h5>
              {/* <a href="#"><i className="fa fa-facebook-square fa-2x"></i></a> */}
              <a href="https://twitter.com/DudeUnoob69" target={"_blank"} style={{ color: darkTheme == true ? "white" : "black" }}><i className="fa fa-twitter-square fa-2x" style={{ color: darkTheme == true ? "white" : "black" }}></i></a>
              <a href="https://www.instagram.com/damodar_kamanii/" target={"_blank"} style={{ color: darkTheme == true ? "white" : "black" }}><i className="fa fa-instagram fa-2x" style={{ color: darkTheme == true ? "white" : "black" }}></i></a>
            </div>
          </div>
          <hr />
          <p className="text-center">Copyright © 2023 Gita GPT</p>
        </div>
      </footer>


    </>
  )
}