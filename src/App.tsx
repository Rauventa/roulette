import React, {useContext, useEffect} from 'react';
import './styles/main.scss'
import {AppLayout} from "./layouts/AppLayout/AppLayout";
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import {RootRouter} from "./routers/RootRouter/RootRouter";
import {axiosClient} from "./utils/axiosClient";

export const App = () => {

    // const refreshTimeout = 1000 * 10;

    const {login, logout, token, refreshToken, userId, nickname} = useAuth()
    const isAuth = !!token

    // const getRefreshToken = async () => {
    //     try {
    //         const response = await axiosClient.get('/Auth/GetRefreshToken', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //
    //         console.log(response.data.payload)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // useEffect(() => {
    //     setInterval(async () => {
    //       try {
    //           const response = await axiosClient.get('/Auth/GetRefreshToken', {
    //               headers: {
    //                   'Authorization': `Bearer ${token}`
    //               }
    //           })
    //
    //           console.log(response.data.payload)
    //       } catch (e) {
    //           console.log(e)
    //       }
    //     }, refreshTimeout)
    // }, []);

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
