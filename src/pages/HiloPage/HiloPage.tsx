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
import {HiloResults} from "./components/HiloResults/HiloResults";

export const HiloPage = () => {

  const defaultFormState = {
    betValue: 0.0001,
  }

  const [formState, setFormState] = useState<any>(defaultFormState)
  const [loader, setLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

  const {token, isAuth} = useContext(AuthContext)

  const hash = useSelector((state: any) => state.hiloReducer.hash) || 'Hash is invisible for unauthorized users'

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
        <UserCard />

        <BetCard
          formState={formState}
          type={'hilo'}
          handleChange={handleChange}
        />

        <GameCard
          formState={formState}
          hash={hash}
          type={'hilo'}
        />

        <HiloResults />
      </div>
    </div>
  )
}