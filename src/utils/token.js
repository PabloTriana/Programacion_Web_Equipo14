import jwtDecote from "jwt-decode"

export const hasExpiredToken = (token) => {
    const { exp } = jwtDecote(token);
    const currentData = new Date().getTime();

    if (exp <= currentData) {
        return true //token expirado
    }

    return false;
}