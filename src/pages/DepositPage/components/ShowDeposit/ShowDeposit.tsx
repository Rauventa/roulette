import React from 'react';
import {Button} from "../../../../components/Button/Button";
import { $t } from '../../../../lib/i18n';
import {Card} from "../../../../components/Card/Card";
import {Input} from "../../../../components/Input/Input";
import {config} from "../../../../config/config";

interface ShowDepositProps {
  code: string,
  onChangePage: (value: string) => void
}

export const ShowDeposit = ({
  code,
  onChangePage
}: ShowDepositProps) => {

  const handleSubmit = () => {
    onChangePage('select')
  }

  return (
    <div className="deposit-container__content">
      {code === '' ?
        <div className={'text-secondary'}>
          {$t('No referral address')}
        </div> :
        <Card>
          <div className="deposit-container__content_title text-secondary">
            {$t('Your own BTC wallet')}
          </div>

          <div className="deposit-container__content_text">
            {$t('Top up your wallet and funds will be credited to your account')}
          </div>

          <Input
            placeholder={'Address'}
            type={'text'}
            value={code}
            disabled
          />

          <img src={`${config.defaultQrCodeUrl}${code}`} alt="qr-code"/>

          <div className={'deposit-container__content_buttons'}>
            <Button light onClick={handleSubmit}>
              {$t('Go back')}
            </Button>
          </div>
        </Card>
      }
    </div>
  )
}