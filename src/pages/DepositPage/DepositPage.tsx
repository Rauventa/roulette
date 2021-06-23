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

      <Card className={'fit-card'}>
        <Input
          onChange={(value) => setPromocode(value)}
          placeholder={''}
          type={'text'}
          value={promocode}
          title={'Use promocode to refill your balance'}
        />

        <Button primary>
          {$t('Apply')}
        </Button>
      </Card>
    </div>
  )
}