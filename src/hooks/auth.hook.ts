import {useState, useCallback, useEffect} from "react";
import {axiosClient} from "../utils/axiosClient";

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

    // const refreshTimeout = 60 * 1000 * 5
    //
    // if (token) {
    //     setInterval(async () => {
    //         try {
    //             const response = await axiosClient.post('/Auth/RefreshToken', {
    //                 jwtToken: token,
    //                 refreshToken: refreshToken
    //             })
    //
    //             const data = response.data
    //
    //             if (response.data.errors.length) {
    //                 if (response.data.errors[0] === 'Token is not expired') {
    //
    //                 }
    //             } else {
    //                 login(data.token, data.refreshToken, data.userId, data.nickname)
    //             }
    //
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }, refreshTimeout)
    // }

    return {login, logout, token, refreshToken, userId, nickname}
}