import React, {useState} from 'react';
import { $t } from '../../lib/i18n';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import './BetCard.scss'
import {Range} from "../Range/Range";
import {ReactComponent as MinusIcon} from "./img/minus.svg";
import {ReactComponent as PlusIcon} from "./img/plus.svg";

interface BetCardProps {

}

export const BetCard = ({

}: BetCardProps) => {

  const [range, setRange] = useState<number>(50)

  const changeRangeHandler = (value: number) => {
    setRange(value)
  }

  return (
    <Card className={'bet-card'}>
      <div className="bet-card__counter">
        <div className="bet-card__counter_minus">
          <MinusIcon />
        </div>
        <input
          className={'bet-card__counter_value'}
          type="text"
          value={0.001}
        />
        <div className="bet-card__counter_plus">
          <PlusIcon />
        </div>
      </div>
      <div className="bet-card__data">
        <div className="bet-card__data_info">
          <div className="bet-card__data_info-text">
            {$t('Probability of Winning')}
          </div>
          <div className="bet-card__data_info-percent">
            {$t(`${range}%`)}
          </div>
        </div>
        <div className="bet-card__data_spinner">
          <Range
            min={1}
            max={75}
            value={range}
            onChange={changeRangeHandler}
          />
        </div>
      </div>
      <div className="bet-card__buttons">
        <Button primary>
          {$t('Make a Bet')}
        </Button>
        <div className={'bet-card__buttons_currency'}>
          {$t('BTC')}
        </div>
      </div>
    </Card>
  )
}