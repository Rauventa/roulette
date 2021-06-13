import {createContext} from 'react';

function noopLogin(jwtToken: any, refreshToken: any, userId: any, nickname: any) {}
function noopLogout() {}

export const AuthContext = createContext({
    token: null,
    refreshToken: null,
    userId: null,
    nickname: null,
    login: noopLogin,
    logout: noopLogout,
    isAuth: false,
})