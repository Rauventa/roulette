import React from 'react';
import { $t } from '../../lib/i18n';

export const RoulettePage = () => {
  return (
    <div className={'roulette'}>

        <div className="page-title">
            {$t('Roulette')}
        </div>

        <div className={'text-secondary'}>
            {$t('This page stands in development')}
        </div>
    </div>
  )
}