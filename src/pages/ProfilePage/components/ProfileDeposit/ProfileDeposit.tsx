import React from 'react';
import './ProfileDeposit.scss';
import {DepositContainer} from "../../../../containers/DepositContainer/DepositContainer";

export const ProfileDeposit = () => {
    return (
        <div className={'profile-deposit'}>
          <DepositContainer />
        </div>
    )
}