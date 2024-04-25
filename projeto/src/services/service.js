import axios from "axios"

//Declarar a porta da API
const portaApi = "4466";

//Declarar o IP da máquina
const ip = "192.168.19.134";

//Definir a URL padrão da api

const apiUrlLocal = `http://${ip}:${portaApi}/api`;

export const api = axios.create({
    //passa um objeto com a baseURL como chave e a Url da api como valor
    baseURL: apiUrlLocal
});