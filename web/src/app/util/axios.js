import axios from "axios";
import Cookies from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL,
    withCredentials: true,
    // xsrfHeaderName: 'X-CSRFToken',
    // xsrfCookieName: 'csrftoken',
    headers: {
        "Content-Type": "application/json",
    },
    
    
})
api.interceptors.request.use(function (req) {
    const token = Cookies.get('csrftoken')
    const mytoken = Cookies.get('sessionid')
    console.log("the csrf token: " + mytoken)
    req.headers['x-csrftoken'] = token
    return req

})
export default api;