import React, {useContext, useState} from 'react';
import {Button} from "../../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {getBalance} from "../../../../store/actions/Balance/balanceActions";
import {AuthContext} from "../../../../context/AuthContext";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {getHiloHistory, startHilo} from "../../../../store/actions/Hilo/hiloActions";
import {getRating, getStats} from "../../../../store/actions/Stats/statsActions";
import {config} from "../../../../config/config";
import {modalService} from "../../../../services/modal/modalService";
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

  const {token, isAuth} = useContext(AuthContext)

  const [loader, setLoader] = useState<boolean>(false)

  const {t} = useTranslation()

  const dispatch = useDispatch()

  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const currency = useSelector((state: any) => state.balanceReducer.currency)

  const hash = useSelector((state: any) => state.hiloReducer.hash)

  const makeBetHandler = async (type: string) => {

    if (!isAuth) {
      modalService('info', 'Login please to start playing', {
        title: 'Unauthorized',
        buttons: [
          {
            value: false,
            text: 'Login',
            primary: true,
            to: '/login'
          },
          {
            value: false,
            text: 'Close',
            light: true,
          }
        ]
      })
    } else {
      // setLoader(true)

      let betWithCurrency = currency === 'btc' ? bet : (bet / rate).toFixed(8)

      try {
        await dispatch(startHilo(
            token,
            {
              bet: betWithCurrency,
              rollType: type
            },
            hash
        ))

        await dispatch(getBalance(token, rate))

        await dispatch(getHiloHistory(token, config.historyLoadParams))

        await dispatch(getStats(token))
        await dispatch(getRating(token))

        setLoader(false)
      } catch (e) {
        console.log(e)
      }
    }
  }


  return (
    <>
      {/*<CSSTransition in={modal} timeout={500} unmountOnExit classNames="my-node">*/}
      {/*  <OldModal*/}
      {/*    title={'Hilo result'}*/}
      {/*    type={'hilo'}*/}
      {/*    formState={result}*/}
      {/*    onClose={modalCloseHandler}*/}
      {/*  />*/}
      {/*</CSSTransition>*/}

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