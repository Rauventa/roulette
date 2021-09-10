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
import {RatingPage} from "../../pages/RatingPage/RatingPage";
import {ProfilePage} from "../../pages/ProfilePage/ProfilePage";
import {PaymentProofPage} from "../../pages/PaymentProofPage/PaymentProofPage";
import {FaucetPage} from "../../pages/FaucetPage/FaucetPage";
import {Page404} from "../../pages/Page404/Page404";

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
                <Route path={'/faucet'}>
                  <FaucetPage />
                </Route>
                <Route path={'/deposit'}>
                    <DepositPage />
                </Route>
                <Route path={'/withdraw'}>
                    <WithdrawPage />
                </Route>
                <Route path={'/rating'}>
                    <RatingPage />
                </Route>
                <Route path={'/profile'}>
                  <ProfilePage />
                </Route>
                <Route path={'/payment-proof'}>
                  <PaymentProofPage />
                </Route>

                <Route path='*' exact>
                  <Page404 />
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
                <Route path={'/faucet'}>
                  <FaucetPage />
                </Route>
                <Route path={'/rating'}>
                    <RatingPage />
                </Route>

                <Route path='*' exact>
                  <Page404 />
                </Route>
            </Switch>
        )
    }
}