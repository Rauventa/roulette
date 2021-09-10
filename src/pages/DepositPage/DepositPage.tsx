import React from 'react';
import './DepositPage.scss'
import { t } from '../../lib/i18n';
import {DepositContainer} from "../../containers/DepositContainer/DepositContainer";

export const DepositPage = () => {

  return (
    <div className={'deposit-page'}>
      <div className="page-title">
        {t('Deposit')}
      </div>

      <DepositContainer />
    </div>
  )
}