import React, {useContext, useState} from 'react';
import {Button} from "../../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {Modal} from "../../../../components/Modal/Modal";
import {closeModalHandler} from "../../../../store/actions/Modal/modalActions";
import {getBalance} from "../../../../store/actions/Balance/balanceActions";
import {AuthContext} from "../../../../context/AuthContext";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {startHilo} from "../../../../store/actions/Hilo/hiloActions";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

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

  const {t} = useTranslation()

  const history = useHistory()

  const {token, isAuth} = useContext(AuthContext)

  const [loader, setLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

  const result = useSelector((state: any) => state.hiloReducer.result)
  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const currency = useSelector((state: any) => state.balanceReducer.currency)

  const hash = useSelector((state: any) => state.hiloReducer.hash)

  const modal = useSelector((state: any) => state.modalReducer.modal)

  const makeBetHandler = async (type: string) => {

    if (!isAuth) {
      history.push('/login')
    } else {
      setLoader(true)

      try {
        await dispatch(startHilo(
            token,
            {
              bet,
              rollType: type
            },
            hash
        ))

        setLoader(false)
      } catch (e) {
        console.log(e)
      }
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
          {t(`Bet < ${defaultRange.lessRange}`)}
        </Button>
        <Button primary onClick={() => makeBetHandler('MoreTHan52')}>
          {t(`Bet > ${defaultRange.moreRange}`)}
        </Button>
        <div className={'bet-card__buttons_currency'}>
          {currency === 'btc' ?
              t('BTC') :
              t('USD')
          }
        </div>
      </div>
    </>
  )
}