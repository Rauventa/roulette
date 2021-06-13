import {useState, useCallback, useEffect} from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [nickname, setNickname] = useState(null)

    const login = useCallback((jwtToken, refreshTokenValue, userIdValue, nicknameValue) => {
        setToken(jwtToken)
        setRefreshToken(refreshTokenValue)
        setUserId(userIdValue)
        setNickname(nicknameValue)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            refreshToken: refreshTokenValue,
            userId: userIdValue,
            nickname: nicknameValue
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setRefreshToken(null)
        setUserId(null)
        setNickname(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(<string>localStorage.getItem(storageName))

        if (data?.token) {
            login(data.token, data.refreshToken, data.userId, data.nickname)
        }
    }, [login])

    return {login, logout, token, refreshToken, userId, nickname}
}