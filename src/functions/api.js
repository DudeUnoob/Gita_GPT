import { apiKey } from "./config/config.json"
import axios from "axios"

const BASE_URL = `https://api.sanskriti.ai/v1/content/bhagavad_gita`

export async function callApi(message, chatHistory) {

    if(window.localStorage.getItem("chat_history")){

        
    }
   
    const {data} = await axios.post(BASE_URL, { question: message, chat_history: chatHistory }, {
        headers:{
            "x-api-key": apiKey,
            "Content-Type":"application/json"
        }
    })

    return data;
}