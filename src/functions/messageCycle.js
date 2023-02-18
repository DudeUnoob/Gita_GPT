import axios from "axios";
import { callApi } from "./api";

export const messageCycle = async(message) => {
    const chatHistory = window.localStorage.getItem("chat_history")
    const chatScrollHistory = window.localStorage.getItem("scrolling_chat_history")
    const data = await callApi(message, JSON.parse(chatHistory))
    if (chatHistory) {
        // setMessageValue(null)
        // setLoading(true)
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
        // setMessageValue(null)
        // setLoading(true)
        const data = await callApi(message)
        // setLoading(false)
        // setMessageValue(data)
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