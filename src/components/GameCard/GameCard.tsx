import React from 'react';
import { Card } from '../Card/Card';
import './GameCard.scss'
import {$t} from "../../lib/i18n";

interface GameCardProps {
  formState: any,
  hash: string
}

export const GameCard = ({
  formState,
  hash
}: GameCardProps) => {

  const possibleProfit = parseFloat((formState.betValue * Number((100 / formState.range * (1 - 2 / 100)).toFixed(4))).toFixed(8));

  return (
    <Card className={'game-card'} title={'Game'}>
      <div className={'game-card__subtitle'}>
        <div className="card__subtitle_left">
          {$t('Fair Game')}
        </div>
        <div className="card__subtitle_right text-secondary">
          {$t(`${hash}`)}
        </div>
      </div>
      <div className="game-card__counter">
        <div className="game-card__counter_value">
          <div className="game-card__counter_value-number">
            <div className="game-card__counter_value-number--count">
              {$t(`${possibleProfit}`)}
            </div>
            <div className="game-card__counter_value-number--currency">
              {$t('BTC')}
            </div>
          </div>
          <div className="game-card__counter_value-info">
            {$t('Possible win')}
          </div>
        </div>
        <div className="game-card__counter_percent">
          <div className="game-card__counter_percent-value">
            {$t(`${formState.range} %`)}
          </div>
          <div className="game-card__counter_percent-info">
            {$t('Chance')}
          </div>
        </div>
      </div>
    </Card>
  )
}