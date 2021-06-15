import React, {useContext, useState} from 'react';
import { $t } from '../../lib/i18n';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import './BetCard.scss'
import {Range} from "../Range/Range";
import {ReactComponent as MinusIcon} from "./img/minus.svg";
import {ReactComponent as PlusIcon} from "./img/plus.svg";
import {useDispatch, useSelector} from "react-redux";
import {startDice} from "../../store/actions/Dice/diceActions";
import {AuthContext} from "../../context/AuthContext";
import {getBalance} from "../../store/actions/Balance/balanceActions";
import { Modal } from '../Modal/Modal';

interface BetCardProps {
  formState: any;
  handleChange: (value: any, iterator: string) => void;
}

export const BetCard = ({
  formState,
  handleChange
}: BetCardProps) => {

  const [range, setRange] = useState<number>(50)
  const [bet, setBet] = useState<number>(0.0001)

  const [modal, setModal] = useState<boolean>(false)

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const result = useSelector((state: any) => state.diceReducer.result)

  const changeRangeHandler = (value: number) => {
    setRange(value)

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

  const makeBetHandler = async () => {
    await dispatch(startDice(token, {
      bet,
      chance: range - 1
    }, range))

    setModal(true)
  }

  return (
    <Card className={'bet-card'}>
      {modal ?
        <Modal
          title={'Dice result'}
          formState={result}
          onClose={() => setModal(false)}
        /> : null
      }
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
        <Button primary onClick={makeBetHandler}>
          {$t('Make a Bet')}
        </Button>
        <div className={'bet-card__buttons_currency'}>
          {$t('BTC')}
        </div>
      </div>
    </Card>
  )
}