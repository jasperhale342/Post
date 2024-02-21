import axios from "axios";
import Cookies from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    
})
api.interceptors.request.use(async function (req) {
    const token = await Cookies.get('csrftoken')
    req.headers['x-csrftoken'] = token
    return req

})
export default api;