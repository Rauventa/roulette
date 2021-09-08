import React, {useContext, useEffect, useState} from 'react';
import './RoulettePage.scss';
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {BetCard} from "../../components/BetCard/BetCard";
import {GameCard} from "../../components/GameCard/GameCard";
import {TimeLine} from "../../components/TimeLine/TimeLine";
import {Select} from "../../components/Select/Select";
import {useDispatch, useSelector} from "react-redux";
import {getMinOrder, getRouletteGame} from "../../store/actions/Roulette/rouletteActions";
import {AuthContext} from "../../context/AuthContext";
import {RouletteBets} from "./components/RouletteBets/RouletteBets";
import {RoulettePlayers} from "./components/RoulettePlayers/RoulettePlayers";
import {RouletteSpinner} from "./components/RouletteSpinner/RouletteSpinner";
import {loaderVisibilityHandler} from "../../store/actions/Application/applicationActions";
import {gameModalService} from "../../services/modal/gameModalService";

export const RoulettePage = () => {

  const defaultFormState = {
    betValue: 0.00001
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

  const animationRouletteDuration = 10000

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    await dispatch(getRouletteGame(token, {gameType: gameMode.value, durationInMinutes: gameType.value}))
    await dispatch(getMinOrder(token))
  }

  const gameData = useSelector((state: any) => state.rouletteReducer.gameData)
  const hash = useSelector((state: any) => state.rouletteReducer.hash)
  const gameNumber = useSelector((state: any) => state.rouletteReducer.gameNumber)
  const result = useSelector((state: any) => state.rouletteReducer.result)
  // const minOrder = useSelector((state: any) => state.rouletteReducer.minOrder)

  // useEffect(() => {
  //   setFormState((prevState: any) => {
  //     return {
  //       ...prevState,
  //       betValue: minOrder
  //     }
  //   })
  // }, [minOrder]);

  useEffect(() => {
    if (result.hash) {
      setTimeout(async () => {
        await gameModalService('roulette', {...result, gameMode: `${gameMode.label}, ${gameType.label}`})
      }, animationRouletteDuration)
    }
  }, [result]);

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

  console.log(result)

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
          formState={{...formState, gameMode, gameType}}
          type={'roulette'}
          handleChange={handleChange}
        />

        <GameCard
          formState={formState}
          pot={gameData?.bank}
          hash={hash}
          gameNumber={gameNumber}
          gameData={gameData}
          type={'roulette'}
        />
      </div>

      {result.players ?
        <div className="roulette__spinner">
          <RouletteSpinner
            result={result}
            gameData={gameData}
          />
        </div> : null
      }

      {gameData?.players?.length ?
        <div className="roulette__players">
          <RoulettePlayers
            gameData={gameData}
          />
        </div> : null
      }

      {gameData?.bets?.length ?
        <div className="roulette__bets">
          <RouletteBets
            gameData={gameData}
          />
        </div> : null
      }
    </div>
  )
}