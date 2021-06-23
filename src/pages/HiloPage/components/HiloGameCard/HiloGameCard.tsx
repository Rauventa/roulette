import React from 'react';
import {$t} from "../../../../lib/i18n";

interface HiloGameCardProps {
  formState: any,
  currency: string,
  jackpot: number
}

export const HiloGameCard = ({
  formState,
  currency,
  jackpot
}: HiloGameCardProps) => {
  return (
    <div className="game-card__counter">
      <div className="game-card__counter_value">
        <div className="game-card__counter_value-number">
          <div className="game-card__counter_value-number--count">
            {$t(`${jackpot}`)}
          </div>
          <div className="game-card__counter_value-number--currency">
            {$t(currency === 'btc' ? 'BTC' : '$')}
          </div>
        </div>
        <div className="game-card__counter_value-info">
          {$t('Jackpot')}
        </div>
      </div>
      <div className="game-card__counter_percent">
        <div className="game-card__counter_percent-value">
          {$t(`${formState.defaultChance} %`)}
        </div>
        <div className="game-card__counter_percent-info">
          {$t('Chance')}
        </div>
      </div>
    </div>
  )
}