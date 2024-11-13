import axios from 'axios';



const api =axios.create({
    // baseURL: 'http://localhost:8080'
     baseURL: 'https://cakebackend-2.onrender.com'
})

export default api;