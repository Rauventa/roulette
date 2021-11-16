import React, {useContext, useState} from 'react';
import {Card} from "../../../../components/Card/Card";
import {Input} from "../../../../components/Input/Input";
import {Button} from "../../../../components/Button/Button";
import {ReactComponent as BitcoinIcon} from "../../img/btc-ico-white.svg";
import {useTranslation} from "react-i18next";
import { axiosClient } from "../../../../utils/axiosClient";
import {AuthContext} from "../../../../context/AuthContext";
import {loaderVisibilityHandler, updateInformer} from "../../../../store/actions/Application/applicationActions";
import {useDispatch} from "react-redux";
interface SelectDepositProps {
  onChangePage: (value: string) => void;
}

export const SelectDeposit = ({
  onChangePage,
}: SelectDepositProps) => {

  const {token} = useContext(AuthContext)
  const dispatch = useDispatch()

  const [code, setCode] = useState<string>('')

  const {t} = useTranslation()

  const handleSubmit = () => {
    onChangePage('currency')
  }

  const promoHandler = async () => {
    await axiosClient.post('/Profile/ActivatePromocode', {value: code}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    dispatch(updateInformer({message: 'Promo code applied', active: true, type: 'info'}))
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
          <div className="payment-options__item" onClick={handleSubmit}>
            <BitcoinIcon />
          </div>
        </div>
      </Card>
    </div>
  )
}