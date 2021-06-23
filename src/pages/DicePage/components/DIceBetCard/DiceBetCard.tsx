import React, {useContext, useState} from 'react';
import {$t} from "../../../../lib/i18n";
import {Range} from "../../../../components/Range/Range";
import {Button} from "../../../../components/Button/Button";
import {startDice} from "../../../../store/actions/Dice/diceActions";
import {CSSTransition} from "react-transition-group";
import {Modal} from "../../../../components/Modal/Modal";
import {getBalance} from "../../../../store/actions/Balance/balanceActions";
import {AuthContext} from "../../../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";

interface DiceBetCardProps {
  bet: number;
  changeRangeHandler: (value: number) => void;
}

export const DiceBetCard = ({
  bet,
  changeRangeHandler,
}: DiceBetCardProps) => {

  const [range, setRange] = useState<number>(50)
  const [modal, setModal] = useState<boolean>(false)

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const result = useSelector((state: any) => state.diceReducer.result)

  const rangeUpdate = (value: number) => {
    setRange(value)

    changeRangeHandler(value)
  }

  const makeBetHandler = async () => {
    await dispatch(startDice(token, {
      bet,
      chance: range + 1
    }, range))

    setModal(true)
  }

  const closeModalHandler = async () => {
    try {
      await dispatch(getBalance(token))

      setModal(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <CSSTransition in={modal} timeout={300} unmountOnExit classNames="my-node">
        <Modal
          title={'Dice result'}
          formState={result}
          onClose={closeModalHandler}
        />
      </CSSTransition>

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
            max={99}
            value={range}
            onChange={rangeUpdate}
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
    </>
  )
}