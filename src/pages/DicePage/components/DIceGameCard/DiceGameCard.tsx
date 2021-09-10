import React from 'react';
import {useSelector} from "react-redux";
import {getTicker} from "../../../../lib/tickers";
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import {useTranslation} from "react-i18next";

interface DiceGameCardProps {
  currency: string,
  formState: any
}

export const DiceGameCard = ({
  currency,
  formState
}: DiceGameCardProps) => {

  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const {t} = useTranslation()

  let possibleProfit = parseFloat((formState.betValue * Number((100 / formState.range * (1 - 2 / 100)).toFixed(4))).toFixed(8));

  if (currency === 'usd') {
    possibleProfit = parseFloat((formState.betValue * Number((100 / formState.range * (1 - 2 / 100)).toFixed(4))).toFixed(8)) / rate
  }

  return (
    <div className="game-card__counter">
      <div className="game-card__counter_value">
        <div className="game-card__counter_value-number">
          <div className="game-card__counter_value-number--count">
            {t(`${currencyValueChanger(currency, rate, possibleProfit)}`)}
          </div>
          <div className="game-card__counter_value-number--currency">
            {t(`${getTicker(currency)}`)}
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