import React from 'react';
import {$t} from "../../../lib/i18n";
import {ReactComponent as Card1Icon} from "./img/card-1.svg";
import {ReactComponent as Card2Icon} from "./img/card-2.svg";
import {ReactComponent as Card3Icon} from "./img/card-3.svg";
import {ReactComponent as Card4Icon} from "./img/card-4.svg";
import {ReactComponent as Card5Icon} from "./img/card-5.svg";
import {currencyValueChanger, toDotThs} from "../../../lib/numberRefractor";
import {useSelector} from "react-redux";
import {getTicker} from "../../../lib/tickers";

interface StatsRowItemProps {
  title: string,
  value: number
}

export const StatsRowItem = ({
  title,
  value
}: StatsRowItemProps) => {

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  return (
    <>
      {title === 'topJackpot' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <Card1Icon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
                 <span className={'stats-row__item_text-title--dollar'}>
                   {$t(`${getTicker(currency, {shortTickers: true})}`)}
                 </span>
              {$t(`${toDotThs(currencyValueChanger(currency, rate, value))}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Top jackpot')}
            </div>
          </div>
        </div> : null
      }

      {title === 'paidTotal' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <Card2Icon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
                 <span className={'stats-row__item_text-title--dollar'}>
                   {$t(`${getTicker(currency, {shortTickers: true})}`)}
                 </span>
              {$t(`${toDotThs(currencyValueChanger(currency, rate, value))}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Paid total')}
            </div>
          </div>
        </div> : null
      }

      {title === 'gamesToday' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <Card3Icon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Games today')}
            </div>
          </div>
        </div> : null
      }

      {title === 'gamesTotal' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <Card3Icon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Games total')}
            </div>
          </div>
        </div> : null
      }

      {title === 'topLuck' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <Card4Icon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              {$t(`${toDotThs(value)}`)}
              <span className={'stats-row__item_text-title--percent'}>
                {$t('%')}
              </span>
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Top luck')}
            </div>
          </div>
        </div> : null
      }

      {title === 'maxBet' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <Card5Icon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              <span className={'stats-row__item_text-title--dollar'}>
                {$t(`${getTicker(currency, {shortTickers: true})}`)}
              </span>
              {$t(`${toDotThs(currencyValueChanger(currency, rate, value))}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Max bet')}
            </div>
          </div>
        </div> : null
      }

      {title === 'wonTotal' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <Card2Icon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              <span className={'stats-row__item_text-title--dollar'}>
                {$t(`${getTicker(currency, {shortTickers: true})}`)}
              </span>
              {$t(`${toDotThs(currencyValueChanger(currency, rate, value))}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Won total')}
            </div>
          </div>
        </div> : null
      }
    </>
  )
}