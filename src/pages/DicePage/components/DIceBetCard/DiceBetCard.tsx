import React, {useContext, useState} from 'react';
import {$t} from "../../../../lib/i18n";
import {Range} from "../../../../components/Range/Range";
import {Button} from "../../../../components/Button/Button";
import {getDiceHistory, startDice} from "../../../../store/actions/Dice/diceActions";
import {CSSTransition} from "react-transition-group";
import {AuthContext} from "../../../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {useHistory} from "react-router-dom";
import {getRating, getStats} from "../../../../store/actions/Stats/statsActions";
import {config} from "../../../../config/config";
import {getBalance} from "../../../../store/actions/Balance/balanceActions";

interface DiceBetCardProps {
  bet: number;
  changeRangeHandler: (value: number) => void;
}

export const DiceBetCard = ({
  bet,
  changeRangeHandler,
}: DiceBetCardProps) => {

  const [range, setRange] = useState<number>(50)
  const [loader, setLoader] = useState<boolean>(false)

  const history = useHistory()

  const {token, isAuth} = useContext(AuthContext)

  const dispatch = useDispatch()

  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const currency = useSelector((state: any) => state.balanceReducer.currency)

  const hash = useSelector((state: any) => state.diceReducer.hash)

  const rangeUpdate = (value: number) => {
    setRange(value)

    changeRangeHandler(value)
  }

  const makeBetHandler = async () => {

    if (!isAuth) {
      history.push('/login')
    } else {
      // setLoader(true)

      let betWithCurrency = currency === 'btc' ? bet : (bet / rate).toFixed(8)

      try {
        await dispatch(startDice(
            token,
            {
              bet: betWithCurrency,
              chance: Number(range)
            },
            Number(range) + 1,
            hash
            )
        )

        await dispatch(getBalance(token, rate))

        await dispatch(getDiceHistory(token, config.historyLoadParams))

        await dispatch(getStats(token))
        await dispatch(getRating(token))

        // setLoader(false)
      } catch (e) {
        console.log(e)
      }
    }
  }

  // const modalCloseHandler = async () => {
  //   // dispatch(closeModalHandler())
  //   setLoader(true)
  //
  //   try {
  //     await dispatch(getBalance(token, rate))
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   setLoader(false)
  // }

  return (
    <>
      {/*<CSSTransition in={modal} timeout={500} unmountOnExit classNames="my-node">*/}
      {/*  <OldModal*/}
      {/*    title={'Dice result'}*/}
      {/*    type={'dice'}*/}
      {/*    formState={result}*/}
      {/*    onClose={modalCloseHandler}*/}
      {/*  />*/}
      {/*</CSSTransition>*/}

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
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
          {currency === 'btc' ?
              $t('BTC') :
              $t('USD')
          }
        </div>
      </div>
    </>
  )
}