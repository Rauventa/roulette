import React from 'react';
import './UserWallets.scss'
import {Card} from "../../../../components/Card/Card";
import { $t } from '../../../../lib/i18n';
import { Button } from '../../../../components/Button/Button';
import {WalletItem} from "./WalletItem/WalletItem";

export const UserWallets = () => {
  return (
    <Card title={'BTC Wallets'} className={'user-wallets'}>
      <div className="user-wallets__add">
        <Button dark>
          {$t('+ Add')}
        </Button>
      </div>
      <div className="user-wallets__content">
        <WalletItem />
      </div>
    </Card>
  )
}