import React from 'react';
import './DepositPage.scss'
import {Card} from "../../components/Card/Card";
import { Input } from '../../components/Input/Input';
import { $t } from '../../lib/i18n';
import { Button } from '../../components/Button/Button';

export const DepositPage = () => {
  return (
    <div className={'deposit-page'}>
      <Card className={'fit-card'}>
        <Input
          onChange={() => console.log('hello')}
          placeholder={'kjljk'}
          type={'text'}
          value={'sdfsdf'}
          title={'Use promocode to refill your balance'}
        />

        <Button primary>
          {$t('Apply')}
        </Button>
      </Card>
    </div>
  )
}