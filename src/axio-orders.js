import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-289de-default-rtdb.firebaseio.com/'
});

export default instance;
