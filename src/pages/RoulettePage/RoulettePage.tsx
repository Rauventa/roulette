import React from 'react';
import {useTranslation} from "react-i18next";

export const RoulettePage = () => {

    const {t} = useTranslation()

  return (
    <div className={'roulette'}>

        <div className="page-title">
            {t('Roulette')}
        </div>

        <div className={'text-secondary'}>
            {t('This page stands in development')}
        </div>
    </div>
  )
}