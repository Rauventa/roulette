import React from 'react';
import {$t} from "../../lib/i18n";
import {UserWallets} from "../ProfilePage/components/UserWallets/UserWallets";

export const CabinetPage = () => {
  return (
    <div className={'cabinet'}>
      <div className="page-title">
        {$t('Cabinet')}
      </div>

      {/*<div className="cabinet__content">*/}
      {/*  <UserWallets />*/}
      {/*</div>*/}
    </div>
  )
}