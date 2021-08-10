import React, {useContext, useEffect} from 'react';
import './styles/main.scss'
import {AppLayout} from "./layouts/AppLayout/AppLayout";
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import {RootRouter} from "./routers/RootRouter/RootRouter";
import axios from 'axios'
import {axiosClient} from "./utils/axiosClient";

export const App = () => {

    // const refreshTimeout = 100 * 60;

    const {login, logout, token, refreshToken, userId, nickname} = useAuth()
    const isAuth = !!token

    // useEffect(() => {
    //     if (token) {
    //         setInterval(async () => {
    //
    //             console.log(token)
    //
    //             console.log(refreshToken)
    //             try {
    //                 const response = await axiosClient.post('/Auth/GetRefreshToken', {
    //                     jwtToken: token,
    //                     refreshToken: refreshToken
    //                 })
    //
    //                 console.log(response.data)
    //             } catch (e) {
    //                 console.log(e)
    //             }
    //         }, refreshTimeout)
    //     }
    // }, [token]);

    return (
        <AuthContext.Provider value={{
            token, refreshToken, userId, nickname, login, logout, isAuth
        }}>
            <AppLayout>
                <RootRouter />
            </AppLayout>
        </AuthContext.Provider>
    )
}
