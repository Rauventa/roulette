import React from 'react';
import './RoulettePage.scss';
import { $t } from '../../lib/i18n';
import {StatsRow} from "../../components/StatsRow/StatsRow";

export const RoulettePage = () => {

  return (
    <div className={'roulette'}>
      <StatsRow />
        {/*<div className="page-title">*/}
        {/*    {$t('Roulette')}*/}
        {/*</div>*/}

        {/*<div className={'text-secondary'}>*/}
        {/*    {$t('This page stands in development')}*/}
        {/*</div>*/}
    </div>
  )
}