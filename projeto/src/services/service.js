import axios from "axios"

//Declarar a porta da API
const portaApi = "4466";

//Declarar o IP da máquina
const ip = "192.168.223.248";

//Definir a URL padrão da api

const apiUrlLocal = `http://${ip}:${portaApi}/api`;

const api = axios.create({
    //passa um objeto com a baseURL como chave e a Url da api como valor
    baseURL: apiUrlLocal
});

export default api;