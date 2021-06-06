import React from 'react';
import './DicePage.scss'
import {UserCard} from "../../components/UserCard/UserCard";

export const DicePage = () => {
  return (
    <div className={'dice-page'}>
      <div className="dice-page__content">
        <UserCard />
      </div>
    </div>
  )
}