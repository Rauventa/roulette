import React from 'react';
import './WalletItem.scss';

import {ReactComponent as BTCIcon} from "./img/btc-ico-orange.svg";
import {ReactComponent as TrashIcon} from "./img/wallet-del.svg";
import {ReactComponent as SettingsIcon} from "./img/wallet-set.svg";
import { $t } from '../../../../../lib/i18n';
import {Button} from "../../../../../components/Button/Button";

export const WalletItem = () => {
  return (
    <div className={'wallet-item'}>
      <div className="wallet-item__content">
        <div className="wallet-item__content_icon">
          <BTCIcon />
        </div>
        <div className="wallet-item__content_data">
          <div className="wallet-item__content_data-name">
            {$t('kjlkjlkjlkj')}
          </div>
          <div className="wallet-item__content_data-balance text-secondary">
            {$t('10 BTC')}
          </div>
        </div>
      </div>
      <div className="wallet-item__buttons">
        <Button dark>
          <SettingsIcon />
        </Button>
        <Button dark>
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}