import React, {useContext, useEffect, useState} from 'react';
import './Header.scss';
import { NavLink, useHistory } from 'react-router-dom';
import {ReactComponent as RouletteIcon} from "./img/roulette.svg";
import {ReactComponent as RuIcon} from "./img/russia.svg";
import {ReactComponent as USIcon} from "./img/united-states.svg";
import {ReactComponent as DiceIcon} from "./img/dice.svg";
import {ReactComponent as FreeBtcIcon} from "./img/freebtc.svg";
import {ReactComponent as UserIcon} from "./img/user.svg";
import { Button } from '../Button/Button';
import {LogoWheel} from "../Optional/LogoWheel/LogoWheel";
import { AuthContext } from '../../context/AuthContext';
import {ReactComponent as LogoutIcon} from "./img/logout.svg";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrency} from "../../store/actions/Balance/balanceActions";
import {useTranslation} from "react-i18next";

export const Header = () => {

  const {logout, isAuth} = useContext(AuthContext);

  const {t, i18n} = useTranslation()

  const history = useHistory();

  const dispatch = useDispatch()

  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)

  const [showLangs, setShowLangs] = useState<boolean>(false);
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false)

  const handleChangeCurrency = (value: string) => {
    dispatch(changeCurrency(value))

    setShowCurrency(false)
  }

  const showAllLangsHandler = () => {
    setShowLangs(!showLangs)

    if (!showLangs) {
      setShowCurrency(false)
      setMenu(false)
    }
  }

  const showAllCurrencyHandler = () => {
    setShowCurrency(!showCurrency)

    if (!showCurrency) {
      setShowLangs(false)
      setMenu(false)
    }
  }

  const handleChangeMenu = () => {
    setMenu(!menu)

    if (!menu) {
      setShowLangs(false)
      setShowCurrency(false)
    }
  }

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)

    setShowLangs(false)
  }

  const logoutHandler = () => {
    logout()
    history.push('/login')
  }

  return (
    <header className={'header'}>
      <div className={'header__nav'}>
        <div className="header__nav_logo">
          <LogoWheel />
        </div>
        <NavLink className="header__nav_item" to={'/'}>
          <div className="header__nav_item-icon">
            <RouletteIcon />
          </div>
          <div className="header__nav_item-name">
            {t('Roulette')}
          </div>
        </NavLink>
        <NavLink className="header__nav_item" to={'/dice'} >
          <div className="header__nav_item-icon">
            <RouletteIcon />
          </div>
          <div className="header__nav_item-name">
            {t('Dice')}
          </div>
        </NavLink>
        <NavLink className="header__nav_item" to={'/hilo'} >
          <div className="header__nav_item-icon">
            <RouletteIcon />
          </div>
          <div className="header__nav_item-name">
            {t('HiLo')}
          </div>
        </NavLink>
      </div>
      <div className="header__additional">

        <div className="header__additional_rate">
          {t(`1 BTC = ${rate}$`)}
        </div>

        <div className="currency-select">
          <div className="currency-select__current text-secondary" onClick={showAllCurrencyHandler}>
            {currency === 'btc' ?
                t('BTC') :
                t('USD')
            }
          </div>
          {showCurrency ?
              <div className="currency-select__all">
                <div className={'currency-select__all_item text-secondary'} onClick={() => handleChangeCurrency('btc')}>
                  {t('BTC')}
                </div>
                <div className={'currency-select__all_item text-secondary'} onClick={() => handleChangeCurrency('usd')}>
                  {t('USD')}
                </div>
              </div> : null
          }
        </div>

        <div className={'language-select'}>
          <div className="language-select__current" onClick={showAllLangsHandler}>
            {i18n.language === 'ru' ?
              <div className="language-icon">
                <RuIcon />
              </div> :
              <div className="language-icon">
                <USIcon />
              </div>
            }
          </div>
          {showLangs ?
            <div className="language-select__all">
              <div className="language-select__all_item" onClick={() => changeLanguage('ru')}>
                <RuIcon />
              </div>
              <div className="language-select__all_item" onClick={() => changeLanguage('en')}>
                <USIcon />
              </div>
            </div> : null
          }
        </div>
        {!isAuth ?
            <div className="header__additional_auth">
              <Button dark href={'/login'}>
                {t('Sign In')}
              </Button>
              <Button dark href={'/registration'}>
                {t('Sign Up')}
              </Button>
            </div> :
            <div className="header__additional_user">
              <div className="header__additional_user-value" onClick={handleChangeMenu}>
                <UserIcon />
              </div>

              {menu ?
                  <div className="header__additional_user-list">
                    <div className="header__additional_user-list--item" onClick={() => history.push('/cabinet')}>
                      {t('Wallets')}
                    </div>
                    <div className="header__additional_user-list--item" onClick={logoutHandler}>
                      <LogoutIcon />
                    </div>
                  </div> : null
              }
            </div>
        }
      </div>
    </header>
  )
}