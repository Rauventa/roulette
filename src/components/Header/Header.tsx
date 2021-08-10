import React, {useContext, useEffect, useState} from 'react';
import { $t } from '../../lib/i18n';
import './Header.scss';
import { NavLink, useHistory } from 'react-router-dom';
import {ReactComponent as RuIcon} from "./img/russia.svg";
import {ReactComponent as USIcon} from "./img/united-states.svg";
import {ReactComponent as BTCIcon} from './img/btc-ico.svg';
import {ReactComponent as TopUpIcon} from './img/btc-up.svg';
import UserIcon from './img/default.png';
import { Button } from '../Button/Button';
import { AuthContext } from '../../context/AuthContext';
import {ReactComponent as LogoutIcon} from "./img/logout.svg";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrency, getBalance} from "../../store/actions/Balance/balanceActions";
import {getTicker} from "../../lib/tickers";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../Spinner/Spinner";
import {config} from "../../config/config";
import {getAvatar} from "../../store/actions/Profile/profileActions";

export const Header = () => {

  const {logout, isAuth, token} = useContext(AuthContext);

  const history = useHistory();

  const dispatch = useDispatch()

  const btc = useSelector((state: any) => state.balanceReducer.balanceBtc)
  const usd = useSelector((state: any) => state.balanceReducer.balanceUsd)
  const currency = useSelector((state: any) => state.balanceReducer.currency)
  const rate = useSelector((state: any) => state.balanceReducer.rate)
  const avatar = useSelector((state: any) => state.profileReducer.avatar)

  const currentLang = localStorage.getItem('lang')

  const [lang, setLang] = useState<string>(currentLang || 'ru');
  const [showLangs, setShowLangs] = useState<boolean>(false);
  const [navigation, setNavigation] = useState<boolean>(false)
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    if (!localStorage.lang) {
      if (lang === 'ru') {
        localStorage.setItem('lang', 'ru')
      } else {
        localStorage.setItem('lang', 'en')
      }
    }
  }, []);

  useEffect(() => {
    fetchData()
  }, [token])

  const fetchData = async () => {
    if (isAuth) {
      setLoader(true)
    }

    if (token) {
      await dispatch(getBalance(token, rate))
      await dispatch(getAvatar(token))
      setLoader(false)
    }
  }

  const handleChangeCurrency = (value: string) => {
    dispatch(changeCurrency(value))

    setShowCurrency(false)
  }

  const showAllLangsHandler = () => {
    setShowLangs(!showLangs)

    if (!showLangs) {
      setShowCurrency(false)
    }
  }

  const showAllCurrencyHandler = () => {
    setShowCurrency(!showCurrency)

    if (!showCurrency) {
      setShowLangs(false)
    }
  }

  const handleChangeLang = (lang: string) => {
    if (lang === 'ru') {
      setLang('ru')
      localStorage.setItem('lang', 'ru')
      // i18n.changeLanguage('ru')
    } else {
      setLang('en')
      localStorage.setItem('lang', 'en')
      // i18n.changeLanguage('en')
    }

    setShowLangs(false)
  }

  const profileMoveHandler = () => {
    history.push('/profile')
  }

  const logoutHandler = () => {
    logout()
    history.push('/login')
  }

  return (
    <header className={'header'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <div className={'header__nav'}>
        <NavLink to={'/'} className="header__nav_logo">
          B
        </NavLink>
        <div className="header__nav_items" onClick={() => setNavigation(!navigation)}>
          <div className="header__nav_items-current">
            <div className="header__nav_items-current--text">
              {$t('Play')}
            </div>
            <div className={`header__nav_items-current--icon ${navigation ? 'active-dropdown' : ''}`}/>
          </div>
          {navigation ?
              <div className="header__nav_items-all">
                <NavLink to={'/dice'} className={'header__nav_items-all--item'}>
                  {$t('Dice')}
                </NavLink>
                <NavLink to={'/hilo'} className={'header__nav_items-all--item'}>
                  {$t('HiLo')}
                </NavLink>
                <NavLink to={'/faucet'} className={'header__nav_items-all--item'}>
                  {$t('Free BTC')}
                </NavLink>
              </div> : null
          }
        </div>
        <NavLink className="header__nav_item" to={'/rating'} >
          <div className="header__nav_item-name">
            {$t('Rating')}
          </div>
        </NavLink>
      </div>
      <div className="header__additional">

        <div className="header__additional_rate">
          <div className="header__additional_rate-icon">
            <BTCIcon />
          </div>
          <div className="header__additional_rate-text">
            {$t(`$${rate}`)}
          </div>
          <div className="header__additional_rate-up">
            <TopUpIcon />
          </div>
        </div>

        {isAuth ?
            <div className="header-balance" onClick={showAllCurrencyHandler}>
              <div className="header-balance__current">
                <div className="header-balance__current_value">
                  {$t(`${currency === 'btc' ? btc || 0 : usd.toFixed(1) || 0}`)}
                </div>
                <div className="header-balance__current_currency">
                  {getTicker(currency)}
                </div>
              </div>
              <div className={`header-balance__select ${showCurrency ? 'active-dropdown' : ''}`}/>
              {showCurrency ?
                  <div className="header-balance__all">
                    <div className={'header-balance__all_item text-secondary'} onClick={() => handleChangeCurrency('btc')}>
                      {$t('BTC')}
                    </div>
                    <div className={'header-balance__all_item text-secondary'} onClick={() => handleChangeCurrency('usd')}>
                      {$t('USD')}
                    </div>
                  </div> : null
              }
            </div> : null
        }

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
              <div className="language-select__all_item">
                <RuIcon onClick={() => handleChangeLang('ru')} />
              </div>
              <div className="language-select__all_item">
                <USIcon onClick={() => handleChangeLang('en')} />
              </div>
            </div> : null
          }
        </div>
        {!isAuth ?
            <div className="header__additional_auth">
              <Button dark href={'/login'}>
                {$t('Sign In')}
              </Button>
              <Button dark href={'/registration'}>
                {$t('Sign Up')}
              </Button>
            </div> :
            <div className="header__additional_user">
              <div className="header__additional_user-value" onClick={profileMoveHandler}>
                {avatar ?
                    <img src={`${config.apiPhotoPrefixUrl}/${avatar}`} alt="user-icon"/> :
                    <img src={UserIcon} alt="user-icon"/>
                }
              </div>
              <div className="header__additional_user-logout" onClick={logoutHandler}>
                <LogoutIcon />
              </div>
            </div>
        }
      </div>
    </header>
  )
}