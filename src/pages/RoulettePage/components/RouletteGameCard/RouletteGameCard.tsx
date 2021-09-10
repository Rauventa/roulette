import React from 'react';
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import {getTicker} from "../../../../lib/tickers";
import {useTranslation} from "react-i18next";

interface RouletteGameCardProps {
  pot?: number,
  gameData?: any,
  currency: string,
  rate: any
}

export const RouletteGameCard = ({
  pot,
  currency,
  gameData,
  rate
}: RouletteGameCardProps) => {

  const {t} = useTranslation()

  return (
    <div className={'game-card__counter'}>
      <div className="game-card__counter_value">
        <div className="game-card__counter_value-number">
          <div className="game-card__counter_value-number--count">
            {t(`${currencyValueChanger(currency, rate, pot || 0)}`)}
          </div>
          <div className="game-card__counter_value-number--currency">
            {t(`${getTicker(currency)}`)}
          </div>
        </div>
        <div className="game-card__counter_value-info">
          {t('Pot')}
        </div>
      </div>
      <div className="game-card__counter_percent">
        <div className="game-card__counter_percent-value">
          {t(`${gameData?.bets?.length || 0} / 60`)}
        </div>
        <div className="game-card__counter_percent-info">
          {t('Total Bets')}
        </div>
      </div>
    </div>
  )
}