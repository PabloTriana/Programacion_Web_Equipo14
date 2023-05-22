import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api"
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

//Componente que resive el children
export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); //estados

    useEffect(() => {
        (async () => {
            const accessToken = authController.getAccesToken();
            const refreshToken = authController.getRefreshToken();

            if (!accessToken || !refreshToken) {
                logout();
                setLoading(false);
                return;
            }

            if (hasExpiredToken(accessToken)) {
                //ha caducado el token
                if (hasExpiredToken(refreshToken)) {
                    logout();
                } else {
                    await reLogin(refreshToken);
                }
            } else {
                await login(accessToken);
            }

            setLoading(false);
        })()

        //Comprobar si el usuario esta logueado o no
    }, [])

    //funcion refrescar el login
    const reLogin = async (refreshToken) => {
        try {
            const { accessToken } = await authController.refreshAccessToken(refreshToken);
            authController.setAccessToken(accessToken);
            await login(accessToken);
        } catch (error) {
            console.error(error)
        }
    }


    const login = async (accessToken) => {
        try {
            const response = await userController.getMe(accessToken);
            delete response.password //eliminar password

            setUser(response) //obtener usuario
            setToken(accessToken); //obtener token
        } catch (error) {
            console.error(error)
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens();
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout,
    };

    if (loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}