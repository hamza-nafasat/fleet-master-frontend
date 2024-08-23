import axios from "axios";
import { baseUrl } from "../redux/store";

const customAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
const customFormAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});
export { customFormAxios, customAxios };
