import React, {useContext, useState} from 'react';
import './WithdrawPage.scss'
import {Card} from "../../components/Card/Card";
import { Button } from '../../components/Button/Button';
import { $t } from '../../lib/i18n';
import { Input } from '../../components/Input/Input';
import {Select} from "../../components/Select/Select";
import {axiosClient} from "../../utils/axiosClient";
import {AuthContext} from "../../context/AuthContext";

export const WithdrawPage = () => {

  const walletsOptions = [
    {
      label: 'BTC wallet BINANCE',
      value: 'btc-binance'
    },
    {
      label: 'BTC wallet OKEX',
      value: 'btc-okex'
    },
  ]

  const [amount, setAmount] = useState<string>('0.01')
  const [wallet, setWallet] = useState<any>(walletsOptions[0])

  const {token} = useContext(AuthContext)

  const getWithdrawWallets = async () => {
    try {
      const response = await axiosClient.get('/Profile/GetWithdrawWallets', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(response.data.payload)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={'withdraw-page'}>

      <div className="page-title">
        {$t('Withdraw')}
      </div>

      <Card>
        <div className={'withdraw-page__content'}>
          <div className={'withdraw-page__content_amount'}>
            <Input
              title={'Amount'}
              placeholder={''}
              type={'text'}
              value={amount}
              onChange={(value) => setAmount(value)}
            />
            <div className="input-bottom-placeholder">
              <div className="input-bottom-placeholder__left">
                <div className="input-bottom-placeholder_item">
                  {$t('Min 0.001 BTC')}
                </div>
                <div className="input-bottom-placeholder_item">
                  {$t('Max 350 BTC')}
                </div>
              </div>
              <div className="input-bottom-placeholder__right">
                {$t('Commission 0.0005 BTC')}
              </div>
            </div>
          </div>
          <div className={'withdraw-page__content_wallet'}>
            <Select
              title={'Wallet'}
              options={walletsOptions}
              value={wallet}
              onChange={(value) => setWallet(value)}
            />
          </div>
        </div>
        <Button primary onClick={getWithdrawWallets}>
          {$t('Withdraw Funds')}
        </Button>
      </Card>
    </div>
  )
}