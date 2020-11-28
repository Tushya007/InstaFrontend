import axios from 'axios';

const instence = axios.create({
    baseURL: 'http://localhost:8000',
});

export default instence;
