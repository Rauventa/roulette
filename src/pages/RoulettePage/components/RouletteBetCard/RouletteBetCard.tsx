import React from 'react';
import './RouletteBetCard.scss';
import {Button} from "../../../../components/Button/Button";
import {$t} from "../../../../lib/i18n";
import {useSelector} from "react-redux";

interface RouletteBetCardProps {
  bet: number,
  handleChange: (value: number) => void
}

export const RouletteBetCard = ({
  bet,
  handleChange
}: RouletteBetCardProps) => {

  console.log(bet)

  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const currency = useSelector((state: any) => state.balanceReducer.currency)

  const betValues = [1, 2, 5, 10, 25, 50, 75, 100]

  const handleSubmit = () => {

  }

  return (
    <div className={'roulette-bet-card'}>

      <div className="bet-card__data">
        <div className="roulette-bet-card__bets">
          {betValues.map((item: number, index: number) => {
            return (
              <div key={index+item} className={'roulette-bet-card__bets_bet'} onClick={() => handleChange(bet + item*bet)}>
                {$t(item)}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bet-card__buttons">
        <Button primary onClick={handleSubmit}>
          {$t('Make a Bet')}
        </Button>
        <div className={'bet-card__buttons_currency'}>
          {currency === 'btc' ?
            $t('BTC') :
            $t('USD')
          }
        </div>
      </div>
    </div>
  )
}