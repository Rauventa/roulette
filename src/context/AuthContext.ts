import {createContext} from 'react';

function noopLogin(token: string, refreshToken: string) {}
function noopLogout() {}

export const AuthContext = createContext({
    token: null,
    refreshToken: null,
    login: noopLogin,
    logout: noopLogout,
    isAuth: false,
})