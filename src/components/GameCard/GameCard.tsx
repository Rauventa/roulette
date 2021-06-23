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

  const possibleProfit = parseFloat((formState.betValue * Number((100 / formState.range * (1 - 2 / 100)).toFixed(4))).toFixed(8));

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

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
          possibleProfit={currency === 'btc' ? possibleProfit : (possibleProfit * rate).toFixed(1)}
          currency={currency}
          formState={formState}
        /> : null
      }
      {type === 'hilo' ?
        <HiloGameCard
          formState={formState}
          jackpot={currency === 'btc' ? formState.jackpot : (formState.jackpot * rate).toFixed(1)}
          currency={currency}
        /> : null
      }
    </Card>
  )
}