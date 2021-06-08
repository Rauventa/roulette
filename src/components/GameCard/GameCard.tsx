import React from 'react';
import { Card } from '../Card/Card';
import './GameCard.scss'
import {$t} from "../../lib/i18n";

interface GameCardProps {

}

export const GameCard = ({

}: GameCardProps) => {
  return (
    <Card className={'game-card'} title={'Game'}>
      <div className={'game-card__subtitle'}>
        {$t('Fair Game')}
      </div>
      <div className="game-card__counter">
        <div className="game-card__counter_value">
          <div className="game-card__counter_value-number">
            <div className="game-card__counter_value-number--count">
              {$t('000.16')}
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
            {$t('50 %')}
          </div>
          <div className="game-card__counter_percent-info">
            {$t('Chance')}
          </div>
        </div>
      </div>
    </Card>
  )
}