import React, {useContext} from 'react';
import './UserCard.scss';
import {Card} from "../Card/Card";
import {Button} from "../Button/Button";
import {$t} from "../../lib/i18n";
import {ReactComponent as UserIcon} from "./img/user.svg";
import {AuthContext} from "../../context/AuthContext";

export const UserCard = () => {

  const {isAuth} = useContext(AuthContext);

  return (
    <Card>
      {!isAuth ?
          <div className={'user-card'}>
            <div className={'user-card__title'}>
              <UserIcon />
              <div className={'user-card__title_text'}>
                {$t('You are guest')}
              </div>
            </div>
            <Button primary href={'/auth'}>
              {$t('Sign In')}
            </Button>
          </div> :
          <p>Poshel nahui</p>
      }
    </Card>
  )
}