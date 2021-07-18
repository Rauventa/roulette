import React, {useState, useEffect, useContext} from 'react';
import './DicePage.scss'
import {UserCard} from "../../components/UserCard/UserCard";
import {BetCard} from "../../components/BetCard/BetCard";
import {GameCard} from "../../components/GameCard/GameCard";
import {useDispatch, useSelector} from "react-redux";
import {getDiceHash} from "../../store/actions/Dice/diceActions";
import {AuthContext} from "../../context/AuthContext";
import {DiceResults} from "./components/DiceResults/DiceResults";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import {StatsRow} from "../../components/StatsRow/StatsRow";

export const DicePage = () => {

  const currency = useSelector((state: any) => state.balanceReducer.currency)

  const defaultFormState = {
    range: 50,
    betValue: 0.0001
  }

  const [formState, setFormState] = useState<any>(defaultFormState)
  const [loader, setLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

  const {token, isAuth} = useContext(AuthContext)

  const hash = useSelector((state: any) => state.diceReducer.hash) || Math.random().toString(36).substring(2);
  const gameNumber = useSelector((state: any) => state.diceReducer.gameNumber)

  const fetchData = async () => {

    if (isAuth) {
      setLoader(true)
    }

    if (token) {
      await dispatch(getDiceHash(token))
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [token]);

  const handleChange = (value: any, iterator: string) => {

    switch (iterator) {
      case 'range':
        setFormState((prev: any) => {
          return {
            ...prev,
            range: Number(value)
          }
        })
        break;
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
    <div className={'dice-page'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <div className="dice-page__content">

        <StatsRow />

        <UserCard />

        <BetCard
          formState={formState}
          type={'dice'}
          handleChange={handleChange}
        />

        <GameCard
          formState={formState}
          hash={hash}
          gameNumber={gameNumber}
          type={'dice'}
        />

        {isAuth ?
            <DiceResults /> : null
        }
      </div>
    </div>
  )
}