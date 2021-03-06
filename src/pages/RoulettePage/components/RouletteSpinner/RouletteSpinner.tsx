import React from 'react';
import './RouletteSpinner.scss'
import {config} from "../../../../config/config";
import DefaultIcon from "../../../../containers/DiceResults/img/default.png";

import {ReactComponent as ArrowIcon} from "./img/arrow-top.svg";

interface RouletteSpinnerProps {
  gameData: any,
  result: any
}

export const RouletteSpinner = ({
  gameData,
  result
}: RouletteSpinnerProps) => {

  const spinnerData: any = []

  const winPlayer = result?.players.find((item: any) => item.isWinner === true)

  if (gameData?.players) {
    gameData.players.forEach((item: any) => {
      for (let i = 0; i < item.chance; i++) {
        spinnerData.push(item)
      }
    })
  }

  spinnerData.sort(() => Math.round(Math.random() * 100) - 50)

  if (winPlayer) {
    spinnerData.splice(24, 1, winPlayer)
  }

  return (
    <div className={'roulette-spinner'}>
      <div className="roulette-spinner__crossbar">
        <ArrowIcon className={'roulette-spinner__crossbar_top'} />
        <ArrowIcon className={'roulette-spinner__crossbar_bottom'} />
      </div>
      <div className={'roulette-spinner__track'}>
        {spinnerData.map((item: any, index: number) => {
          return (
            <div className={'roulette-spinner__track_item'} key={index}>
              <div className={'roulette-players-card__item_avatar'}>
                {item.avatarUrl ?
                  <img src={`${config.apiPhotoPrefixUrl}/${item.avatarUrl}`} alt="user icon"/> :
                  <img src={DefaultIcon} alt="user icon"/>
                }
              </div>
              <div className={'roulette-players-card__item_name'}>
                {item.name}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}