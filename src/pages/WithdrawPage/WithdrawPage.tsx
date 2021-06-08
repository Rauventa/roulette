import React from 'react';
import './WithdrawPage.scss'
import {Card} from "../../components/Card/Card";
import { Button } from '../../components/Button/Button';
import { $t } from '../../lib/i18n';

export const WithdrawPage = () => {
  return (
    <div>
      <h1>WithdrawPage</h1>

      <Card>
        <div>
          <div>

          </div>
          <div>

          </div>
        </div>
        <Button primary>
          {$t('Withdraw Funds')}
        </Button>
      </Card>
    </div>
  )
}