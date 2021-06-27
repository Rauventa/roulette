import React, {useContext} from 'react';
import './UserWallets.scss'
import {Card} from "../../../../components/Card/Card";
import { $t } from '../../../../lib/i18n';
import { Button } from '../../../../components/Button/Button';
import {WalletItem} from "./WalletItem/WalletItem";
import {axiosClient} from "../../../../utils/axiosClient";
import {AuthContext} from "../../../../context/AuthContext";

export const UserWallets = () => {

    const {token} = useContext(AuthContext)

    const addWalletHandler = async () => {
        try {
            const response = await axiosClient.post('/Profile/AddWallet', {
                address: '3BSasKraRXe56ckSBCeNE7ySMXCEYK7nCm',
                currency: 'BTC'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <Card title={'BTC Wallets'} className={'user-wallets'}>
      <div className="user-wallets__add">
        <Button dark onClick={addWalletHandler}>
          {$t('+ Add')}
        </Button>
      </div>
      <div className="user-wallets__content">
        <WalletItem />
      </div>
    </Card>
  )
}