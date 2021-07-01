import React from 'react';
import {UserWallets} from "./components/UserWallets/UserWallets";
import {useTranslation} from "react-i18next";

export const CabinetPage = () => {

    const {t} = useTranslation()

  return (
    <div className={'cabinet'}>
      <div className="page-title">
        {t('Cabinet')}
      </div>

      <div className="cabinet__content">
        <UserWallets />
      </div>
    </div>
  )
}