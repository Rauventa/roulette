import React from 'react';
import './DicePage.scss'
import {UserCard} from "../../components/UserCard/UserCard";
import {BetCard} from "../../components/BetCard/BetCard";
import {GameCard} from "../../components/GameCard/GameCard";

export const DicePage = () => {
  return (
    <div className={'dice-page'}>
      <div className="dice-page__content">
        <UserCard />

        <BetCard />

        <GameCard />
      </div>
    </div>
  )
}