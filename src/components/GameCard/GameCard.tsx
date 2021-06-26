import React from 'react';
import { Card } from '../Card/Card';
import './GameCard.scss'
import {$t} from "../../lib/i18n";
import {DiceGameCard} from "../../pages/DicePage/components/DIceGameCard/DiceGameCard";
import {HiloGameCard} from "../../pages/HiloPage/components/HiloGameCard/HiloGameCard";
import {useSelector} from "react-redux";

interface GameCardProps {
  formState: any,
  hash: string,
  type: string
}

export const GameCard = ({
  formState,
  hash,
  type
}: GameCardProps) => {

  const currency = useSelector((state: any) => state.balanceReducer.currency)

  return (
    <Card className={'game-card'} title={'Game'}>
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
    </Card>
  )
}