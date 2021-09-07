import React, {useContext} from 'react';
import './RouletteBetCard.scss';
import {Button} from "../../../../components/Button/Button";
import {$t} from "../../../../lib/i18n";
import {useDispatch, useSelector} from "react-redux";
import {makeRouletteBet} from "../../../../store/actions/Roulette/rouletteActions";
import {AuthContext} from "../../../../context/AuthContext";
import {loaderVisibilityHandler} from "../../../../store/actions/Application/applicationActions";

interface RouletteBetCardProps {
  formState: any,
  bet: number,
  handleChange: (value: number) => void
}

export const RouletteBetCard = ({
  formState,
  bet,
  handleChange
}: RouletteBetCardProps) => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const currency = useSelector((state: any) => state.balanceReducer.currency)

  const betValues = [1, 2, 5, 10, 25, 50, 75, 100]

  const handleSubmit = async () => {

    await dispatch(loaderVisibilityHandler(true))

    await dispatch(makeRouletteBet(token, {
      gameType: formState.gameMode.value,
      duration: formState.gameType.value,
      bet
    }))

    await dispatch(loaderVisibilityHandler(false))
  }

  //TODO - неправильно счиатется размер ставки при нажатии на ++, к тому же добавить очищение ставки - нужно добавить размер минимальной ставки

  return (
    <div className={'roulette-bet-card'}>
      <div className="bet-card__data">
        <div className="roulette-bet-card__bets">
          {betValues.map((item: number, index: number) => {
            return (
              <div key={index+item} className={'roulette-bet-card__bets_bet'} onClick={() => handleChange(bet + item*0.00001)}>
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