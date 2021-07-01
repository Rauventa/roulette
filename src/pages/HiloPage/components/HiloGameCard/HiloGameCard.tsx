import React from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

interface HiloGameCardProps {
  formState: any,
  currency: string
}

export const HiloGameCard = ({
  formState,
  currency
}: HiloGameCardProps) => {

  const {t} = useTranslation()

  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const possibleProfit = parseFloat((formState.betValue * 2).toFixed(8))

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
          {t(`50 %`)}
        </div>
        <div className="game-card__counter_percent-info">
          {t('Chance')}
        </div>
      </div>
    </div>
  )
}