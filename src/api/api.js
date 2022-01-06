import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8888/api/v1/',
    headers: {
        "API-KEY": "cf33d654-6242-4d8e-9684-14db21c7b808"
    }
})


export const AUTH_API = {

    login(username, password) {
        return instance.post(`auth/login`, {username, password})
    }



}