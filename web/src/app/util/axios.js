import axios from "axios";
import Cookies from "js-cookie";
const baseURL = process.env.DJ_API;
axios.defaults.withCredentials = true;



const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})
api.interceptors.request.use(function (req) {
    const token = Cookies.get('csrftoken');
    req.headers['x-csrftoken'] = token
    return req

})
export default api;