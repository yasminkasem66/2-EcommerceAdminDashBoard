import axios from "axios";

// common configuration in single instance
// const accessToken ='';

const accessToken = localStorage.getItem("token");

// const lang = localStorage.getItem('lang') || 'en';
// axios.defaults.headers.common['Accept-Language'] = lang;
export const axiosInstance = axios.create({
    baseURL:  "http://localhost:2000/api",
    headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : ' ',
        // 'Accept-Language': `${lang}`
    },
});