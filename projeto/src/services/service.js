import axios from "axios";

const ip = "192.168.21.78";

const portaApi = "4466";

const apiUrlLocal = `http://${ip}:${portaApi}/api`;

export const api = axios.create({
    baseURL: apiUrlLocal
})