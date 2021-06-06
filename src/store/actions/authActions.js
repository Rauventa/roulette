// import {RENDER_AUTH_VALUE, RENDER_INITIAL_AUTH} from "../../actionTypes";
// import Cookies from "js-cookie";
//
// export function renderAuthValue(action, data) {
//
//     let authValue = null;
//
//     if (action === 'login') {
//         Cookies.set('userName', data.name + " " + data.surname);
//         Cookies.set('token', data.token);
//         Cookies.set('userId', data.userId);
//
//         authValue = true
//     } else if ('logout') {
//         Cookies.remove('userName');
//         Cookies.remove('token');
//         Cookies.remove('userId');
//
//         authValue = false
//     }
//
//     return {
//         type: RENDER_AUTH_VALUE,
//         authValue
//     }
// }
//
// export function renderInitialAuth() {
//
//     const authValue = !!Cookies.get('userId')
//
//     console.log(authValue)
//
//     return {
//         type: RENDER_INITIAL_AUTH,
//         authValue
//     }
// }