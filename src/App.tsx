import React, {Suspense, useContext, useEffect} from 'react';
import './styles/main.scss'
import {AppLayout} from "./layouts/AppLayout/AppLayout";
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import {RootRouter} from "./routers/RootRouter/RootRouter";
import {axiosClient} from "./utils/axiosClient";

export const App = () => {

    const refreshTimeout = 3600 * 60;

    const {login, logout, token, refreshToken, userId, nickname} = useAuth()
    const isAuth = !!token

    useEffect(() => {
        setInterval(async () => {
          try {
              const response = await axiosClient.post('/Auth/GetRefreshToken', {
                  jwtToken: token,
                  refreshToken: refreshToken
              }, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              })

              console.log(response.data)
          } catch (e) {
              console.log(e)
          }
        }, refreshTimeout)
    }, []);

    return (
        <AuthContext.Provider value={{
            token, refreshToken, userId, nickname, login, logout, isAuth
        }}>
            <Suspense fallback="loading">
                <AppLayout>
                    <RootRouter />
                </AppLayout>
            </Suspense>
        </AuthContext.Provider>
    )
}
