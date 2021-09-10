import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss'
import {useTranslation} from "react-i18next";

export const Footer = () => {

  const {t} = useTranslation()

  return (
    <footer className={'footer'}>
      <NavLink to={'/'} exact className={'text-secondary'}>
        {t('© Bitcoin Roulette')}
      </NavLink>
      <NavLink to={'/'} exact className={'text-secondary'}>
        {t('Rules')}
      </NavLink>
      <NavLink to={'/'} exact className={'text-secondary'}>
        {t('License agreement')}
      </NavLink>
      <NavLink to={'/payment-proof'} exact className={'text-secondary'}>
        {t('Payment proof')}
      </NavLink>
    </footer>
  )
}