import React, {useContext, useEffect, useState} from 'react';
import './WithdrawPage.scss'

import {ReactComponent as BTCIcon} from "./img/btc-ico-orange.svg";
import {ReactComponent as ETHIcon} from "./img/eth.svg";

import {Card} from "../../components/Card/Card";
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import {Select} from "../../components/Select/Select";
import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {createWithdraw, getWallets} from "../../store/actions/Balance/balanceActions";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import {useTranslation} from "react-i18next";

export const WithdrawPage = () => {

  const {t} = useTranslation()

  const {token} = useContext(AuthContext)

  const wallets = useSelector((state: any) => state.balanceReducer.wallets)

  const walletsOptions = wallets?.map((item: any) => {
    return {
      label: <div className={'icon-select-option'}> {item.currency === 'BTC' ? <BTCIcon /> : null } {item.currency === 'ETH' ? <ETHIcon /> : null} {item.address} </div>,
      value: item.id,
    }
  })

  const [amount, setAmount] = useState<string>('0.01')
  const [wallet, setWallet] = useState<any>(null)
  const [loader, setLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

  const fetchData = async () => {
    setLoader(true)

    if (token) {
      await dispatch(getWallets(token))
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const withDrawHandler = () => {

    const currentWallet = wallets?.find((item: any) => item.id === wallet.id)

    dispatch(createWithdraw(token, {
      id: '',
      currency: currentWallet.currency,
      address: currentWallet.address,
      ownerId: currentWallet.ownerId,
      amount
    }))
  }

  return (
    <div className={'withdraw-page'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

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
                  {t('Min 0.001 BTC')}
                </div>
                <div className="input-bottom-placeholder_item">
                  {t('Max 350 BTC')}
                </div>
              </div>
              <div className="input-bottom-placeholder__right">
                {t('Commission 0.0005 BTC')}
              </div>
            </div>
          </div>
          <div className={'withdraw-page__content_wallet'}>
            <Select
              title={'Wallet'}
              placeholder={'Select wallet'}
              options={walletsOptions}
              value={wallet}
              onChange={(value) => setWallet(value)}
            />
          </div>
        </div>
        <Button primary onClick={withDrawHandler} disabled={!wallet}>
          {t('Withdraw Funds')}
        </Button>
      </Card>
    </div>
  )
}