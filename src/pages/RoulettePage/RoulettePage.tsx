import React from 'react';
import { $t } from '../../lib/i18n';
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {currencyValueChanger} from "../../lib/numberRefractor";

export const RoulettePage = () => {
  return (
    <div className={'roulette'}>

        <h1>
            {currencyValueChanger('btc', 5000, 0.00019404)}
        </h1>

        <div className="page-title">
            {$t('Roulette')}
        </div>

        {/*<StatsRow />*/}

        <div className={'text-secondary'}>
            {$t('This page stands in development')}
        </div>
    </div>
  )
}