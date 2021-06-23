import React, {useState} from 'react';
import './HiloPage.scss';
import {UserCard} from "../../components/UserCard/UserCard";
import {GameCard} from "../../components/GameCard/GameCard";
import {BetCard} from "../../components/BetCard/BetCard";

export const HiloPage = () => {

  const defaultFormState = {
    jackpot: 1.03203124,
    defaultChance: 36
  }

  const [formState, setFormState] = useState<any>(defaultFormState)

  const hash = 'dskfjskldfjklsdjf'

  return (
    <div className={'hilo-page'}>
      <div className="hilo-page__content">
        <UserCard />

        <BetCard
          formState={formState}
          type={'hilo'}
          handleChange={() => console.log('hello')}
        />

        <GameCard
          formState={formState}
          hash={hash}
          type={'hilo'}
        />
      </div>
    </div>
  )
}