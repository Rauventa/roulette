import React from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

interface DiceGameCardProps {
  currency: string,
  formState: any
}

export const DiceGameCard = ({
  currency,
  formState
}: DiceGameCardProps) => {

  const {t} = useTranslation()

  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const possibleProfit = parseFloat((formState.betValue * Number((100 / formState.range * (1 - 2 / 100)).toFixed(4))).toFixed(8));

  return (
    <div className="game-card__counter">
      <div className="game-card__counter_value">
        <div className="game-card__counter_value-number">
          <div className="game-card__counter_value-number--count">
            {t(`${currency === 'btc' ? possibleProfit : (possibleProfit*rate).toFixed(1)}`)}
          </div>
          <div className="game-card__counter_value-number--currency">
            {t(currency === 'btc' ? 'BTC' : '$')}
          </div>
        </div>
        <div className="game-card__counter_value-info">
          {t('Possible win')}
        </div>
      </div>
      <div className="game-card__counter_percent">
        <div className="game-card__counter_percent-value">
          {t(`${formState.range + 1}`)}
        </div>
        <div className="game-card__counter_percent-info">
          {t('Roll under')}
        </div>
      </div>
    </div>
  )
}