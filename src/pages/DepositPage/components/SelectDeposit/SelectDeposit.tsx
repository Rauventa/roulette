import React, {useContext, useState} from 'react';
import {Card} from "../../../../components/Card/Card";
import {Input} from "../../../../components/Input/Input";
import {Button} from "../../../../components/Button/Button";
import {ReactComponent as BtcIcon} from "../../img/btc-ico-white.svg";
import {ReactComponent as EthIcon} from "../../img/eth.svg";
import {ReactComponent as LtcIcon} from "../../img/ltc.svg";
import BchIcon from '../../img/bch.png';
import XrpIcon from '../../img/xrp.png';
import {useTranslation} from "react-i18next";
import { axiosClient } from "../../../../utils/axiosClient";
import {AuthContext} from "../../../../context/AuthContext";
import {updateInformer} from "../../../../store/actions/Application/applicationActions";
import {useDispatch} from "react-redux";

interface SelectDepositProps {
  onChangePage: (value: string, currency?: string) => void;
}

export const SelectDeposit = ({
  onChangePage,
}: SelectDepositProps) => {

  const {token} = useContext(AuthContext)
  const dispatch = useDispatch()

  const [code, setCode] = useState<string>('')

  const {t} = useTranslation()

  const handleSubmit = (currency: string) => {
    onChangePage('currency', currency)
  }

  const promoHandler = async () => {
    try {
      await axiosClient.post('/Profile/ActivatePromocode', {value: code}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(updateInformer({message: 'Promo code applied', active: true, type: 'info'}))
    } catch (e:any) {
      dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error'}))
    }
  }

  return (
    <div className="deposit-container__content">
      <Card>
        <Input
          onChange={(value) => setCode(value)}
          placeholder={''}
          type={'text'}
          value={code}
          title={'Use promo code to refill your balance'}
        />

        <Button primary disabled={!code} onClick={promoHandler}>
          {t('Apply')}
        </Button>
      </Card>
      <Card>
        <div className={'text-secondary'}>
          {t('Use one of payment option to refill your balance')}
        </div>

        <div className={'payment-options'}>
          <div className="payment-options__item" onClick={() => handleSubmit('BTC')}>
            <BtcIcon />
          </div>
          <div className="payment-options__item" onClick={() => handleSubmit('ETH')}>
            <EthIcon />
          </div>
          <div className="payment-options__item" onClick={() => handleSubmit('LTC')}>
            <LtcIcon />
          </div>
          <div className="payment-options__item" onClick={() => handleSubmit('BCH')}>
            <img src={BchIcon} />
          </div>
          <div className="payment-options__item" onClick={() => handleSubmit('XRP')}>
            <img src={XrpIcon} />
          </div>
        </div>
      </Card>
    </div>
  )
}