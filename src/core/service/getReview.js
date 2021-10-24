import axios from "axios"

export const getTopic = () => {
    return axios.get("/topic/getAll")
}