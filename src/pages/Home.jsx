import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Form, InputGroup, Spinner } from "react-bootstrap"
import { callApi } from '../functions/api';

export default function Home() {
    const inputText = useRef(null)
    const [messageValue, setMessageValue] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleCallGPT = async() => {
            const chatHistory = window.localStorage.getItem("chat_history")
            const message = inputText.current.value
            //[`Human: ${message}\nAI: ${data?.answer}`]
            if(chatHistory) {
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

    const loadingStyleState = { visibility: loading == true ? "visible" : "hidden"}
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
        
        
        <InputGroup className="mb-3" placeholder='Ask a question!'>
        
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          placeholder='Ask any question related to the bhagavad gita!'
          ref={inputText}
          required
          onKeyDown={(e) => e.code == "Enter" ? handleCallGPT() : ""}
        />
        <Button variant="outline-secondary" id="button-addon1" onClick={handleCallGPT}>
          Send
        </Button>
        
      </InputGroup>
        
        <div className="answers">
            <div className="loadingState">
                <Spinner animation='border' role={"status"} style={secondLoadingStyleState}>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </div>
            <p><b>{messageValue?.answer}</b></p>
        </div>
        </div>

        </>
    )
}