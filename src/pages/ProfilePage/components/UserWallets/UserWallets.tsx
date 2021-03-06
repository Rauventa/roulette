import React, {useContext, useEffect, useState} from 'react';
import './UserWallets.scss'
import {Card} from "../../../../components/Card/Card";
import { Button } from '../../../../components/Button/Button';
import {WalletItem} from "./WalletItem/WalletItem";
import {AuthContext} from "../../../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {createWallet, getWallets} from "../../../../store/actions/Balance/balanceActions";
import {Input} from "../../../../components/Input/Input";
import {Select} from "../../../../components/Select/Select";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {useTranslation} from "react-i18next";

export const UserWallets = () => {

  const {token} = useContext(AuthContext)

  const wallets = useSelector((state: any) => state.balanceReducer.wallets)

  const {t} = useTranslation()

  const dispatch = useDispatch()

  const currencyOptions = [
    {
      label: 'BTC',
      value: 'BTC'
    },
    {
      label: 'ETH',
      value: 'ETH'
    },
    {
      label: 'LTC',
      value: 'LTC'
    },
    {
      label: 'BCH',
      value: 'BCH'
    },
  ]

  const defaultFormState = {
    address: '',
    currency: {
      label: 'BTC',
      value: 'BTC'
    }
  }

  const [formState, setFormState] = useState<any>(defaultFormState)
  const [addShower, setAddShower] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)

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

  const formChangeHandler = (value: any, iterator: string) => {
    switch (iterator) {
      case 'address':
        setFormState((prev: any) => {
          return {
            ...prev,
            address: value
          }
        })
        break;
      case 'currency':
        setFormState((prev: any) => {
          return {
            ...prev,
            currency: value
          }
        })
        break;
    }
  }

  const addWalletHandler = async () => {
    try {
      await dispatch(createWallet(token, {
        address: formState.address,
        currency: formState.currency.value
      }))

      setAddShower(false)

      await fetchData()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card title={'BTC Wallets'} className={'user-wallets'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <div className="user-wallets__add">
        {addShower ?
          <Button dark onClick={() => setAddShower(!addShower)}>
            {t('Close')}
          </Button> :
          <Button dark onClick={() => setAddShower(!addShower)}>
            {t('+ Add')}
          </Button>
        }
      </div>
      <div className="user-wallets__content">

        <CSSTransition in={addShower} timeout={300} unmountOnExit classNames="my-node">
          <div className="user-wallets__content_add">
            <div className="user-wallets__content_add-form">
              <Input placeholder={'Wallet address'} type={'text'} value={formState.address} onChange={(value) => formChangeHandler(value, 'address')} />
              <Select options={currencyOptions} placeholder={'Select currency'} value={formState.currency} onChange={(value) => formChangeHandler(value, 'currency')} />
            </div>
            <Button light onClick={addWalletHandler}>
              {t('Add new wallet')}
            </Button>
          </div>
        </CSSTransition>

        <div className="user-wallets__content_wallets">
          {wallets.length ? wallets.map((item: any, index: number) => {
            return (
              <WalletItem
                key={index}
                data={item}
                onDeleteHandler={fetchData}
              />
            )
          }) :
            <div className={'text-secondary'}>
              {t('No wallets')}
            </div>
          }
        </div>
      </div>
    </Card>
  )
}