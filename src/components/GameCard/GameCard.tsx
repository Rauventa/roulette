import React from 'react';
import { Card } from '../Card/Card';
import './GameCard.scss'
import {$t} from "../../lib/i18n";
import {DiceGameCard} from "../../pages/DicePage/components/DIceGameCard/DiceGameCard";
import {HiloGameCard} from "../../pages/HiloPage/components/HiloGameCard/HiloGameCard";
import {useSelector} from "react-redux";
import {RouletteGameCard} from "../../pages/RoulettePage/components/RouletteGameCard/RouletteGameCard";

interface GameCardProps {
  formState: any,
  gameData?: any,
  pot?: number,
  hash: string,
  gameNumber: number,
  type: string
}

export const GameCard = ({
  formState,
  gameData,
  pot,
  hash,
  gameNumber,
  type
}: GameCardProps) => {

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  return (
    <Card className={'game-card'} title={`Game ${gameNumber ? `${gameNumber}` : ''}`}>
      <div className={'game-card__subtitle'}>
        <div className="card__subtitle_left">
          {$t('Fair Game')}
        </div>
        <div className="card__subtitle_right text-secondary">
          {$t(`${hash}`)}
        </div>
      </div>
      {type === 'dice' ?
        <DiceGameCard
          formState={formState}
          currency={currency}
        /> : null
      }
      {type === 'hilo' ?
        <HiloGameCard
          formState={formState}
          currency={currency}
        /> : null
      }
      {type === 'roulette' ?
        <RouletteGameCard
          pot={pot}
          currency={currency}
          gameData={gameData}
          rate={rate}
        /> : null
      }
    </Card>
  )
}