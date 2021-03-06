import React from 'react';
import './RouletteBets.scss';
import {Card} from "../../../../components/Card/Card";
import {config} from "../../../../config/config";
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import {useSelector} from "react-redux";
import {getTicker} from "../../../../lib/tickers";
import DefaultIcon from "../../../../containers/DiceResults/img/default.png";
import {useTranslation} from "react-i18next";


interface RouletteBetsProps {
  gameData: any
}

export const RouletteBets = ({
  gameData
}: RouletteBetsProps) => {

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const {t} = useTranslation()

  return (
    <Card className={'roulette-bets-card'}>

      {gameData?.bets?.map((item: any, index: number) => {
        return (
          <div className={'roulette-bets-card__item'} key={index}>
            <div className={'roulette-bets-card__item_main'}>
              <div className="roulette-bets-card__item_main-avatar">
                {item.user.avatarUrl ?
                  <img src={`${config.apiPhotoPrefixUrl}/${item.user.avatarUrl}`} alt="user icon"/> :
                  <img src={DefaultIcon} alt="user icon"/>
                }
              </div>
              <div className="roulette-bets-card__item_main-content">
                <div className="roulette-bets-card__item_main-content--name">
                  {item.user.name}
                </div>
                <div className="roulette-bets-card__item_main-content--range">
                  Tickets {item.ticketFrom} - {item.ticketTo}
                </div>
              </div>
            </div>
            <div className="roulette-bets-card__item_bet">
              {t(`${currencyValueChanger(currency, rate, item.amount)}`)} {t(`${getTicker(currency)}`)}
            </div>
          </div>
        )
      })}

    </Card>
  )
}