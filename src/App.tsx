import React from 'react';
import './styles/main.scss'
import {AppLayout} from "./layouts/AppLayout/AppLayout";
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import {RootRouter} from "./routers/RootRouter/RootRouter";

export const App = () => {

    const {login, logout, token, refreshToken, userId, nickname} = useAuth()
    const isAuth = !!token

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
