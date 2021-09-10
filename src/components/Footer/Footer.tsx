import React from 'react';
import { NavLink } from 'react-router-dom';
import { t } from '../../lib/i18n';
import './Footer.scss'

export const Footer = () => {
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