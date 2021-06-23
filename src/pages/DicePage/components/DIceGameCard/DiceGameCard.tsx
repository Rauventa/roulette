import React from 'react';
import {$t} from "../../../../lib/i18n";

interface DiceGameCardProps {
  possibleProfit: any,
  formState: any
}

export const DiceGameCard = ({
  possibleProfit,
  formState
}: DiceGameCardProps) => {
  return (
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
          {$t(`${formState.range + 1}`)}
        </div>
        <div className="game-card__counter_percent-info">
          {$t('Roll under')}
        </div>
      </div>
    </div>
  )
}