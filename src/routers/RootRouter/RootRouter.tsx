import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {RoulettePage} from "../../pages/RoulettePage/RoulettePage";
import {DicePage} from "../../pages/DicePage/DicePage";
import {AuthPage} from "../../pages/AuthPage/AuthPage";
import {WithdrawPage} from "../../pages/WithdrawPage/WithdrawPage";
import {DepositPage} from "../../pages/DepositPage/DepositPage";

export const RootRouter = () => {
  return (
    <Switch>
      <Route path={'/'} exact>
        <RoulettePage />
      </Route>
      <Route path={'/auth'}>
        <AuthPage />
      </Route>
      <Route path={'/dice'}>
        <DicePage />
      </Route>
      <Route path={'/deposit'}>
        <DepositPage />
      </Route>
      <Route path={'/withdraw'}>
        <WithdrawPage />
      </Route>
    </Switch>
  )
}