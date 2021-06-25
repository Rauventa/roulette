import React, {useState} from 'react';
import './DepositPage.scss'
import {Card} from "../../components/Card/Card";
import { Input } from '../../components/Input/Input';
import { $t } from '../../lib/i18n';
import { Button } from '../../components/Button/Button';

export const DepositPage = () => {

  const [promocode, setPromocode] = useState<string>('')

  return (
    <div className={'deposit-page'}>

      <div className="page-title">
        {$t('Deposit')}
      </div>

        <div className="deposit-page__content">
            <Card>
                <Input
                    onChange={(value) => setPromocode(value)}
                    placeholder={''}
                    type={'text'}
                    value={promocode}
                    title={'Use promo code to refill your balance'}
                />

                <Button primary>
                    {$t('Apply')}
                </Button>
            </Card>
            <Card>
                <div className={'text-secondary'}>
                    {$t('Use one of payment option to refill your balance')}
                </div>

                <div className={'payment-options'}>
                    <div className="payment-options__item">
                        {$t('1')}
                    </div>
                    <div className="payment-options__item">
                        {$t('2')}
                    </div>
                </div>
            </Card>
        </div>
    </div>
  )
}