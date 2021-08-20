import React, {useState} from 'react';
import './RoulettePage.scss';
import { $t } from '../../lib/i18n';
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {BetCard} from "../../components/BetCard/BetCard";

export const RoulettePage = () => {

  const defaultFormState = {
    betValue: 0.0001
  }

  const [formState, setFormState] = useState<any>(defaultFormState)

  const handleChange = (value: any) => {
    setFormState((prevState: any) => {
      return {
        ...prevState,
        betValue: value
      }
    })
  }

  return (
    <div className={'roulette'}>
      <StatsRow />

      <div className="roulette__config">

      </div>

      <div className="roulette__content">
        <BetCard
          formState={formState}
          type={'roulette'}
          handleChange={handleChange}
        />
      </div>
    </div>
  )
}