import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8888/api/v1/'
})


export const AUTH_API = {
    login(username, password) {
        return instance.post(`auth/login`, {username, password})
            .then(response => response.data)
    },
    refreshAccessToken(refreshToken) {
        return instance.get(`auth/token/refresh`, {
            headers : {
                "Authorization": `Bearer ${refreshToken}`
            }
        })
    }
}