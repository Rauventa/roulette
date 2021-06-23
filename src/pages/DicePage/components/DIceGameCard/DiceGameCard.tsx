import React from 'react';
import {$t} from "../../../../lib/i18n";

interface DiceGameCardProps {
  possibleProfit: any,
  currency: string,
  formState: any
}

export const DiceGameCard = ({
  possibleProfit,
  currency,
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
            {$t(currency === 'btc' ? 'BTC' : '$')}
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