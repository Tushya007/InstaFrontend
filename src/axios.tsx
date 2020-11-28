import axios from 'axios';

const instence = axios.create({
    baseURL: 'https://hepoku.herokuapp.com/',
});

export default instence;
