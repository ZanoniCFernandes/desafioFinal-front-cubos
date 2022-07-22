import axios from 'axios';

const instanciaAxios = axios.create({
  baseURL: 'https://desafio-t05.herokuapp.com/',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instanciaAxios;