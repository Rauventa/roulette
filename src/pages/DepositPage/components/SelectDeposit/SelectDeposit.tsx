import React, {useState} from 'react';
import {Card} from "../../../../components/Card/Card";
import {Input} from "../../../../components/Input/Input";
import {Button} from "../../../../components/Button/Button";
import {ReactComponent as BitcoinIcon} from "../../img/btc-ico-white.svg";
import {useTranslation} from "react-i18next";

interface SelectDepositProps {
  onChangePage: (value: string) => void;
}

export const SelectDeposit = ({
  onChangePage,
}: SelectDepositProps) => {

  const [promocode, setPromocode] = useState<string>('')

  const {t} = useTranslation()

  const handleSubmit = () => {
    onChangePage('currency')
  }

  return (
    <div className="deposit-container__content">
      <Card>
        <Input
          onChange={(value) => setPromocode(value)}
          placeholder={''}
          type={'text'}
          value={promocode}
          title={'Use promo code to refill your balance'}
        />

        <Button primary>
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