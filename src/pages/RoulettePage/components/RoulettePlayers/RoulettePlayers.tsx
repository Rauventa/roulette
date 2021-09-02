import React from 'react';
import './RoulettePlayers.scss';
import {Card} from "../../../../components/Card/Card";

export const RoulettePlayers = () => {

  const defaultPlayers = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <Card className={'roulette-players-card'}>
      {defaultPlayers.map((item, index) => {
        return (
          <div key={index}>
            <div>Mary</div>
            <div>
              {item}
            </div>
          </div>
        )
      })}
    </Card>
  )
}