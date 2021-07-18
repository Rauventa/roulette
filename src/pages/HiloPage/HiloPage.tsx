import React, {useContext, useEffect, useState} from 'react';
import './HiloPage.scss';
import {UserCard} from "../../components/UserCard/UserCard";
import {GameCard} from "../../components/GameCard/GameCard";
import {BetCard} from "../../components/BetCard/BetCard";
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../context/AuthContext";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import { getHiloHash } from '../../store/actions/Hilo/hiloActions';
import {HiloResults} from "../../containers/HiloResults/HiloResults";
import {StatsRow} from "../../components/StatsRow/StatsRow";

export const HiloPage = () => {

  const defaultFormState = {
    betValue: 0.0001,
  }

  const [formState, setFormState] = useState<any>(defaultFormState)
  const [loader, setLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

  const {token, isAuth} = useContext(AuthContext)

  const hash = useSelector((state: any) => state.hiloReducer.hash) || Math.random().toString(36).substring(2)
  const gameNumber = useSelector((state: any) => state.hiloReducer.gameNumber)

  const fetchData = async () => {

    if (isAuth) {
      setLoader(true)
    }

    if (token) {
      dispatch(getHiloHash(token))
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [token]);

  const handleChange = (value: any, iterator: string) => {

    switch (iterator) {
      case 'bet':
        setFormState((prev: any) => {
          return {
            ...prev,
            betValue: Number(value)
          }
        })
        break;
    }
  }

  return (
    <div className={'hilo-page'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <div className="hilo-page__content">

        <StatsRow />

        <UserCard />

        <BetCard
          formState={formState}
          type={'hilo'}
          handleChange={handleChange}
        />

        <GameCard
          formState={formState}
          gameNumber={gameNumber}
          hash={hash}
          type={'hilo'}
        />

        {isAuth ?
            <HiloResults
              type={'all'}
            /> : null
        }
      </div>
    </div>
  )
}