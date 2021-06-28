import React, {useContext, useState} from 'react';
import {Button} from "../../../../components/Button/Button";
import {$t} from "../../../../lib/i18n";
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {Modal} from "../../../../components/Modal/Modal";
import {closeModalHandler} from "../../../../store/actions/Modal/modalActions";
import {getBalance} from "../../../../store/actions/Balance/balanceActions";
import {AuthContext} from "../../../../context/AuthContext";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {startDice} from "../../../../store/actions/Dice/diceActions";
import {startHilo} from "../../../../store/actions/Hilo/hiloActions";

interface HiloBetCardProps {
  bet: number;
}

export const HiloBetCard = ({
  bet,
}: HiloBetCardProps) => {

  const defaultRange = {
    lessRange: 48,
    moreRange: 52
  }

  const {token} = useContext(AuthContext)

  const [loader, setLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

  const result = useSelector((state: any) => state.hiloReducer.result)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const modal = useSelector((state: any) => state.modalReducer.modal)

  const makeBetHandler = async (type: string) => {

    setLoader(true)

    try {
      await dispatch(startHilo(token, {
        bet,
        rollType: type
      }))

      setLoader(false)
    } catch (e) {
      console.log(e)
    }
  }

  const modalCloseHandler = async () => {
    dispatch(closeModalHandler())
    setLoader(true)

    try {
      await dispatch(getBalance(token, rate))
    } catch (e) {
      console.log(e)
    }
    setLoader(false)
  }

  return (
    <>
      <CSSTransition in={modal} timeout={500} unmountOnExit classNames="my-node">
        <Modal
          title={'Hilo result'}
          type={'hilo'}
          formState={result}
          onClose={modalCloseHandler}
        />
      </CSSTransition>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <div className="bet-card__buttons">
        <Button primary onClick={() => makeBetHandler('LessThan48')}>
          {$t(`Bet < ${defaultRange.lessRange}`)}
        </Button>
        <Button primary onClick={() => makeBetHandler('MoreTHan52')}>
          {$t(`Bet > ${defaultRange.moreRange}`)}
        </Button>
        <div className={'bet-card__buttons_currency'}>
          {$t('BTC')}
        </div>
      </div>
    </>
  )
}