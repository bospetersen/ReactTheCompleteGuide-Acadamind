import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-3e0c2-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance;
