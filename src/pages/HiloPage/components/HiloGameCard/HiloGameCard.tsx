import React from 'react';
import {useSelector} from "react-redux";
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import { getTicker } from '../../../../lib/tickers';
import {useTranslation} from "react-i18next";

interface HiloGameCardProps {
  formState: any,
  currency: string
}

export const HiloGameCard = ({
  formState,
  currency
}: HiloGameCardProps) => {

  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const {t} = useTranslation()

  let possibleProfit = parseFloat((formState.betValue * 2).toFixed(8))

  if (currency === 'usd') {
    possibleProfit = parseFloat((formState.betValue * 2).toFixed(8)) / rate
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
          {t(`50 %`)}
        </div>
        <div className="game-card__counter_percent-info">
          {t('Chance')}
        </div>
      </div>
    </div>
  )
}