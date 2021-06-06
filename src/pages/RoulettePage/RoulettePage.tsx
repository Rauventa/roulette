import React from 'react';
import {Card} from "../../components/Card/Card";
import { $t } from '../../lib/i18n';

export const RoulettePage = () => {
  return (
    <div>
      <h1>RoulettePage</h1>

      <Card>
        <div>
          {$t('Welcome to React')}
        </div>
      </Card>
    </div>
  )
}