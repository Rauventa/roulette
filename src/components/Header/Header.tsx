import React, {useContext, useEffect, useState} from 'react';
import { $t } from '../../lib/i18n';
import './Header.scss';
import { NavLink, useHistory } from 'react-router-dom';
import {ReactComponent as RouletteIcon} from "./img/roulette.svg";
import {ReactComponent as RuIcon} from "./img/russia.svg";
import {ReactComponent as USIcon} from "./img/united-states.svg";
import {ReactComponent as DiceIcon} from "./img/dice.svg";
import {ReactComponent as FreeBtcIcon} from "./img/freebtc.svg";
import { Button } from '../Button/Button';
import {LogoWheel} from "../Optional/LogoWheel/LogoWheel";
import { AuthContext } from '../../context/AuthContext';

export const Header = () => {

  const currentCurrency = localStorage.getItem('currency')
  const currentLang = localStorage.getItem('lang')

  const {logout, isAuth} = useContext(AuthContext);

  const history = useHistory();

  const [currency, setCurrency] = useState<string>(currentCurrency || 'btc');
  const [lang, setLang] = useState<string>(currentLang || 'ru');
  const [showLangs, setShowLangs] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.currency) {
      if (currency) {
        localStorage.setItem('currency', 'btc')
      } else {
        localStorage.setItem('currency', 'usd')
      }
    }

    if (!localStorage.lang) {
      if (lang === 'ru') {
        localStorage.setItem('lang', 'ru')
      } else {
        localStorage.setItem('lang', 'en')
      }
    }
  }, []);

  const handleChangeCurrency = () => {
    if (currency === 'btc') {
      setCurrency('usd')
      localStorage.setItem('currency', 'usd')
    } else {
      setCurrency('btc')
      localStorage.setItem('currency', 'btc')
    }
  }

  const showAllLangsHandler = () => {
    setShowLangs(!showLangs)
  }

  const handleChangeLang = (lang: string) => {
    if (lang === 'ru') {
      setLang('ru')
      localStorage.setItem('lang', 'ru')
    } else {
      setLang('en')
      localStorage.setItem('lang', 'en')
    }

    setShowLangs(false)
  }

  const logoutHandler = () => {
    logout()
    history.push('/auth')
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
            {$t('Roulette')}
          </div>
        </NavLink>
        <NavLink className="header__nav_item" to={'/dice'} >
          <div className="header__nav_item-icon">
            <RouletteIcon />
          </div>
          <div className="header__nav_item-name">
            {$t('Dice')}
          </div>
        </NavLink>
        <NavLink className="header__nav_item" to={'/'} >
          <div className="header__nav_item-icon">
            <RouletteIcon />
          </div>
          <div className="header__nav_item-name">
            {$t('Free BTC')}
          </div>
        </NavLink>
      </div>
      <div className="header__additional">
        <div className="currency text-secondary" onClick={handleChangeCurrency}>
          {currency === 'btc' ?
            $t('BTC') :
            $t('USD')
          }
        </div>
        <div className={'language-select'}>
          <div className="language-select__current" onClick={showAllLangsHandler}>
            {lang === 'ru' ?
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
              <RuIcon onClick={() => handleChangeLang('ru')} />
              <USIcon onClick={() => handleChangeLang('en')} />
            </div> : null
          }
        </div>
        {!isAuth ?
            <Button primary href={'/auth'}>
              {$t('Sign In')}
            </Button> :
            <Button primary onClick={logoutHandler}>
              {$t('Log Out')}
            </Button>
        }
      </div>
    </header>
  )
}