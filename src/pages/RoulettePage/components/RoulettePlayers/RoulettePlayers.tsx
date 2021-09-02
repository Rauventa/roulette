import React from 'react';
import './RoulettePlayers.scss';
import {Card} from "../../../../components/Card/Card";
import {config} from "../../../../config/config";

interface RoulettePlayersProps {
  gameData: any
}

export const RoulettePlayers = ({
    gameData,
}: RoulettePlayersProps) => {

  console.log(gameData)

  const defaultPlayers = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <Card className={'roulette-players-card'}>


      {/*TODO - make message with 0 length users (No users or array with 0% and waiting) */}

      {gameData?.players?.map((item: any, index: number) => {
        return (
          <div className={'roulette-players-card__item'} key={index}>
            <div className={'roulette-players-card__item_avatar'}>
              <img src={`${config.apiPhotoPrefixUrl}/${item.avatarUrl}`} alt="user icon"/>
            </div>
            <div className={'roulette-players-card__item_name'}>
              {item.name}
            </div>
            <div className={'roulette-players-card__item_chance'}>
              {item.chance}%
            </div>
          </div>
        )
      })}
    </Card>
  )
}