import React, {useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import './UserCard.scss';
import {Card} from "../Card/Card";
import {Button} from "../Button/Button";
import {$t} from "../../lib/i18n";
import {ReactComponent as UserIcon} from "./img/user.svg";
import {ReactComponent as LogoutIcon} from "./img/logout.svg";
import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import {getBalance} from "../../store/actions/Balance/balanceActions";

export const UserCard = () => {

  const {logout, isAuth, token, nickname} = useContext(AuthContext);

  const history = useHistory()

  const dispatch = useDispatch()

  const btc = useSelector((state: any) => state.balanceReducer.balanceBtc)
  const usd = useSelector((state: any) => state.balanceReducer.balanceUsd)
  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  useEffect(() => {
    if (token) {
      dispatch(getBalance(token, rate))
    }
  }, [token]);

  const logoutHandler = () => {
    logout()
    history.push('/auth')
  }

  const goToCabinetHandler = () => {
    history.push('/cabinet')
  }

  return (
    <Card>
      {isAuth ?
        <div className={'user-card'}>
          <div className={'user-card__title'}>
            <UserIcon onClick={goToCabinetHandler} />
            <div className={'user-card__title_text'}>
              <div className="user-card__title_text-name">
                {$t(`${nickname}`)}
              </div>
              <div className="user-card__title_text-balance">
                {$t(`${currency === 'btc' ? btc : usd.toFixed(1 )} ${currency === 'btc' ? 'BTC' : '$'}`)}
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
            <Button dark href={'/login'}>
              {$t('Sign In')}
            </Button>
          </div>
        </div>
      }
    </Card>
  )
}