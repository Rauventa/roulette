import {createContext} from 'react';

function noopLogin(jwtToken: any) {}
function noopLogout() {}

export const AuthContext = createContext({
    token: null,
    login: noopLogin,
    logout: noopLogout,
    isAuth: false,
})