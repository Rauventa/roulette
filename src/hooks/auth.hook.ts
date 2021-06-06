import {useState, useCallback, useEffect} from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState<any>(null)
    const [refreshToken, setRefreshToken] = useState<any>(null)

    const login = useCallback((jwtToken, refreshTokenProps) => {
        setToken(jwtToken)
        setRefreshToken(refreshTokenProps)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, refreshToken: refreshTokenProps
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setToken(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        //@ts-ignore
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.refreshToken)
        }
    }, [login])

    return {login, logout, token, refreshToken}
}