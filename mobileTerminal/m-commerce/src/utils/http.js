import axios from 'axios';
import { getStore } from '../utils/storage'
// axios.defaults.headers.token = 
const instance = axios.create({
    baseURL: 'http://localhost:28019/api/v1',
    timeout: 10000,
    headers: {
        token: getStore('token')
    }
})

export default instance