import React, {useEffect, useState} from 'react';
import { Card } from '../Card/Card';
import './BetCard.scss'
import {ReactComponent as MinusIcon} from "./img/minus.svg";
import {ReactComponent as PlusIcon} from "./img/plus.svg";
import {DiceBetCard} from "../../pages/DicePage/components/DIceBetCard/DiceBetCard";
import {HiloBetCard} from "../../pages/HiloPage/components/HiloBetCard/HiloBetCard";
import {useSelector} from "react-redux";
import {RouletteBetCard} from "../../pages/RoulettePage/components/RouletteBetCard/RouletteBetCard";

interface BetCardProps {
  formState: any;
  type: string,
  handleChange: (value: any, iterator?: any) => void;
}

export const BetCard = ({
  formState,
  type,
  handleChange
}: BetCardProps) => {

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const btc = useSelector((state: any) => state.balanceReducer.balanceBtc)
  const usd = useSelector((state: any) => state.balanceReducer.balanceUsd)

  const [bet, setBet] = useState<number>(0.00001)

  useEffect(() => {
    if (currency === 'btc') {
      setBet(0.00001)
      handleChange(0.00001, 'bet')
    } else {
      setBet(10)
      handleChange(10, 'bet')
    }
  }, [currency])

  const changeRangeHandler = (value: number) => {
    handleChange(value, 'range')
  }

  const changeBetHandler = (iterator: string) => {

    const defaultStepValue = currency === 'btc' ? 0.00001 : 1;

    switch (iterator) {
      case 'minus':
        if (bet > 0.00001) {
          setBet(bet - defaultStepValue)

          handleChange(bet - defaultStepValue, 'bet')
        }
        break;
      case 'plus':
        setBet(bet + defaultStepValue)

        handleChange(bet + defaultStepValue, 'bet')
        break;
      case 'min':
        setBet(defaultStepValue)

        handleChange(bet + defaultStepValue, 'bet')
        break;
      case 'max':
        setBet(currency === 'btc' ? btc : usd)

        handleChange(bet + defaultStepValue, 'bet')
        break;
    }
  }

  const changeMultipleCounter = (value: number) => {
    setBet(value)

    handleChange(value)
  }

  const changeInputBetValue = (e: any) => {
    setBet(Number(e.target.value))

    handleChange(Number(e.target.value), 'bet')
  }

  return (
    <Card className={'bet-card'}>
      <div className="bet-card__counter">
        <div className="bet-card__counter_min" onClick={() => changeBetHandler('min')}>
          Min
        </div>
        <div className="bet-card__counter_minus" onClick={() => changeBetHandler('minus')}>
          <MinusIcon />
        </div>
        <input
          className={'bet-card__counter_value'}
          type="text"
          value={currency === 'btc' ? bet?.toFixed(5) : bet}
          onChange={changeInputBetValue}
        />
        <div className="bet-card__counter_plus" onClick={() => changeBetHandler('plus')}>
          <PlusIcon />
        </div>
        <div className="bet-card__counter_max" onClick={() => changeBetHandler('max')}>
          Max
        </div>
      </div>
      {type === 'roulette' ?
        <RouletteBetCard
          formState={formState}
          bet={bet}
          handleChange={changeMultipleCounter}
        /> : null
      }
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