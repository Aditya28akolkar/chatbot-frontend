import axios from "axios";

const api = axios.create({
  baseURL: "https://graspcorn-chatbot.hf.space"
});


export default api;