import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import './UserCard.scss';
import {Card} from "../Card/Card";
import {Button} from "../Button/Button";
import {$t} from "../../lib/i18n";
import {ReactComponent as UserIcon} from "./img/user.svg";
import {ReactComponent as LogoutIcon} from "./img/logout.svg";
import {AuthContext} from "../../context/AuthContext";

export const UserCard = () => {

  const {logout, isAuth} = useContext(AuthContext);

  const history = useHistory()

  const logoutHandler = () => {
    logout()
    history.push('/auth')
  }

  return (
    <Card>
      {isAuth ?
        <div className={'user-card'}>
          <div className={'user-card__title'}>
            <UserIcon />
            <div className={'user-card__title_text'}>
              <div className="user-card__title_text-name">
                {$t('Alex Alecto')}
              </div>
              <div className="user-card__title_text-balance">
                {$t('5000$')}
              </div>
            </div>
          </div>
          <div className="user-card__buttons">
            <Button light href={'/deposit'}>
              {$t('Deposit')}
            </Button>
            <Button secondary href={'/withdraw'}>
              {$t('Withdraw')}
            </Button>
            <Button dark onClick={logoutHandler}>
              <LogoutIcon />
            </Button>
          </div>
        </div> :
        <div className={'user-card'}>
          <div className={'user-card__title'}>
            <UserIcon />
            <div className={'user-card__title_text'}>
              {$t('You are guest')}
            </div>
          </div>
          <div className="user-card__buttons">
            <Button primary href={'/auth'}>
              {$t('Sign In')}
            </Button>
          </div>
        </div>
      }
    </Card>
  )
}