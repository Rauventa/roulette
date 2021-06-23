import React, {useContext} from 'react';
import { Route, Switch } from 'react-router-dom';
import {RoulettePage} from "../../pages/RoulettePage/RoulettePage";
import {DicePage} from "../../pages/DicePage/DicePage";
import {WithdrawPage} from "../../pages/WithdrawPage/WithdrawPage";
import {DepositPage} from "../../pages/DepositPage/DepositPage";
import { SignIn } from '../../pages/AuthPage/components/SignIn/SignIn';
import {SignUp} from "../../pages/AuthPage/components/SignUp/SignUp";
import {HiloPage} from "../../pages/HiloPage/HiloPage";
import {AuthContext} from "../../context/AuthContext";

export const RootRouter = () => {

    const {token} = useContext(AuthContext)

    if (token) {
        return (
            <Switch>
                <Route path={'/'} exact>
                    <RoulettePage />
                </Route>
                <Route path={'/dice'}>
                    <DicePage />
                </Route>
                <Route path={'/hilo'}>
                    <HiloPage />
                </Route>
                <Route path={'/deposit'}>
                    <DepositPage />
                </Route>
                <Route path={'/withdraw'}>
                    <WithdrawPage />
                </Route>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path={'/'} exact>
                    <RoulettePage />
                </Route>
                <Route path={'/login'}>
                    <SignIn />
                </Route>
                <Route path={'/registration'}>
                    <SignUp />
                </Route>
                <Route path={'/dice'}>
                    <DicePage />
                </Route>
                <Route path={'/hilo'}>
                    <HiloPage />
                </Route>
            </Switch>
        )
    }
}