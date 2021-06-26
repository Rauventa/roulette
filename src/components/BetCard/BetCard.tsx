import React, {useState} from 'react';
import { Card } from '../Card/Card';
import './BetCard.scss'
import {ReactComponent as MinusIcon} from "./img/minus.svg";
import {ReactComponent as PlusIcon} from "./img/plus.svg";
import {DiceBetCard} from "../../pages/DicePage/components/DIceBetCard/DiceBetCard";
import {HiloBetCard} from "../../pages/HiloPage/components/HiloBetCard/HiloBetCard";

interface BetCardProps {
  formState: any;
  type: string,
  handleChange: (value: any, iterator: string) => void;
}

export const BetCard = ({
  formState,
  type,
  handleChange
}: BetCardProps) => {

  const [bet, setBet] = useState<number>(0.0001)

  const changeRangeHandler = (value: number) => {
    handleChange(value, 'range')
  }

  const changeBetHandler = (iterator: string) => {

    const defaultStepValue = 0.0001;

    switch (iterator) {
      case 'minus':
        if (bet > 0.0001) {
          setBet(bet - defaultStepValue)

          handleChange(bet - defaultStepValue, 'bet')
        }
        break;
      case 'plus':
        setBet(bet + defaultStepValue)

        handleChange(bet + defaultStepValue, 'bet')
        break;
    }
  }

  const changeInputBetValue = (e: any) => {
    setBet(Number(e.target.value))

    handleChange(Number(e.target.value), 'bet')
  }

  return (
    <Card className={'bet-card'}>
      <div className="bet-card__counter">
        <div className="bet-card__counter_minus" onClick={() => changeBetHandler('minus')}>
          <MinusIcon />
        </div>
        <input
          className={'bet-card__counter_value'}
          type="text"
          value={bet?.toFixed(4)}
          onChange={changeInputBetValue}
        />
        <div className="bet-card__counter_plus" onClick={() => changeBetHandler('plus')}>
          <PlusIcon />
        </div>
      </div>
      {type === 'dice' ?
        <DiceBetCard
          changeRangeHandler={changeRangeHandler}
          bet={bet}
        /> : null
      }
      {type === 'hilo' ?
        <HiloBetCard
          bet={bet}
        /> : null
      }
    </Card>
  )
}