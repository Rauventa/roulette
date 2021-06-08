import React from 'react';
import { $t } from '../../lib/i18n';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import './BetCard.scss'

interface BetCardProps {

}

export const BetCard = ({

}: BetCardProps) => {
  return (
    <Card className={'bet-card'}>
      <div className="bet-card__buttons">
        <Button primary>
          {$t('Make a Bet')}
        </Button>
        <div className={'bet-card__buttons_currency'}>
          {$t('BTC')}
        </div>
      </div>
    </Card>
  )
}