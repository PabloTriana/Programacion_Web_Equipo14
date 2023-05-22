//crear ficheros para peticiones http

/*Importar constantes */
import { ENV } from "../utils"

export class Auth {
    baseApi = ENV.BASE_API

    //registrar usuarios
    async register(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            };
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result

        } catch (error) {
            throw error;
        }
    }
    //funcion de login
    async login(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, params)
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }
    //refrescar token
    async refreshAccessToken(refreshToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: refreshToken
                })
            };
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    //Obtener access token para poder guardar el token

    setAccessToken(token) {
        localStorage.setItem(ENV.JWT.ACCESS, token)
    }

    //obtener token
    getAccesToken() {
        return localStorage.getItem(ENV.JWT.ACCESS);
    }

    //refresh token
    setRefreshToken(token) {
        localStorage.setItem(ENV.JWT.REFRESH, token)
    }

    //obtener refresh token
    getRefreshToken() {
        return localStorage.getItem(ENV.JWT.REFRESH)
    }

    //eliminar token
    removeTokens() {
        localStorage.removeItem(ENV.JWT.ACCESS);
        localStorage.removeItem(ENV.JWT.REFRESH);
    }
}