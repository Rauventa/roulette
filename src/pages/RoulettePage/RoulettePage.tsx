import React, {useContext, useEffect, useState} from 'react';
import './RoulettePage.scss';
import { $t } from '../../lib/i18n';
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {BetCard} from "../../components/BetCard/BetCard";
import {GameCard} from "../../components/GameCard/GameCard";
import {TimeLine} from "../../components/TimeLine/TimeLine";
import {Select} from "../../components/Select/Select";
import {useDispatch, useSelector} from "react-redux";
import {getRouletteGame} from "../../store/actions/Roulette/rouletteActions";
import {AuthContext} from "../../context/AuthContext";
import {RouletteBets} from "./components/RouletteBets/RouletteBets";
import {RoulettePlayers} from "./components/RoulettePlayers/RoulettePlayers";

export const RoulettePage = () => {

  const defaultFormState = {
    betValue: 0.0001
  }

  const dispatch = useDispatch()

  const {token} = useContext(AuthContext)

  const gameModeOptions = [
    {
      label: 'Max 10 bets',
      value: 'Max10Bets'
    },
    {
      label: 'Max 20 tickets',
      value: 'Max20Tickets'
    }
  ]

  const gameTypeOptions = [
    {
      label: 'Minute',
      value: 'Minute'
    },
    {
      label: 'Day',
      value: 'Day'
    },
    {
      label: 'Week',
      value: 'Week'
    }
  ]

  const [formState, setFormState] = useState<any>(defaultFormState)
  const [gameMode, setGameMode] = useState<any>(gameModeOptions[0])
  const [gameType, setGameType] = useState<any>(gameTypeOptions[0])

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    await dispatch(getRouletteGame(token, {gameType: gameMode.value, durationInMinutes: gameType.value}))
  }

  const gameData = useSelector((state: any) => state.rouletteReducer.gameData)

  const handleChange = (value: any) => {
    setFormState((prevState: any) => {
      return {
        ...prevState,
        betValue: value
      }
    })
  }

  const changeConfigHandler = async (data: any, type: string) => {
    switch (type) {
      case 'mode':
        setGameMode(data)

        await dispatch(getRouletteGame(token, {gameType: data.value, durationInMinutes: gameType.value}))

        break;
      case 'type':
        setGameType(data)

        await dispatch(getRouletteGame(token, {gameType: gameMode.value, durationInMinutes: data.value}))

        break;
    }
  }

  return (
    <div className={'roulette'}>
      <StatsRow />

      <div className="roulette__config">
        <div className="roulette__config_types">
          <Select
            options={gameModeOptions}
            value={gameMode}
            onChange={(value) => changeConfigHandler(value,'mode')}
            placeholder={'Game Mode'}
          />
          <Select
            options={gameTypeOptions}
            value={gameType}
            onChange={(value) => changeConfigHandler(value,'type')}
            placeholder={'Game Type'}
          />
        </div>
        <div className="roulette__config_timer">
          <TimeLine seconds={0} text={'Waiting for bets'} />
        </div>
      </div>

      <div className="roulette__content">
        <BetCard
          formState={formState}
          type={'roulette'}
          handleChange={handleChange}
        />

        <GameCard
          formState={formState}
          pot={gameData?.bank}
          hash={gameData.hash}
          gameNumber={gameData.gameNumber}
          type={'roulette'}
        />
      </div>

      <div className="roulette__players">
        <RoulettePlayers
            gameData={gameData}
        />
      </div>

      <div className="roulette__bets">
        <RouletteBets
          gameData={gameData}
        />
      </div>
    </div>
  )
}