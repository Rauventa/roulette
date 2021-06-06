import React from 'react';
import './styles/main.scss'
import {AppLayout} from "./layouts/AppLayout/AppLayout";
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

export const App = () => {

    const {token, login, logout, refreshToken} = useAuth()
    const isAuth = !!token

    console.log(isAuth)

    return (
        <AuthContext.Provider value={{
            token, login, logout, refreshToken, isAuth
        }}>
            <AppLayout />
        </AuthContext.Provider>
    )
}
