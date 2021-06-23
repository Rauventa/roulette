import React from 'react';
import {Button} from "../../../../components/Button/Button";
import {$t} from "../../../../lib/i18n";

interface HiloBetCardProps {
  
}

export const HiloBetCard = ({
  
}: HiloBetCardProps) => {

    const defaultRange = {
        lessRange: 48,
        moreRange: 52
    }

  return (
      <div className="bet-card__buttons">
        <Button primary onClick={() => console.log('hello')}>
          {$t(`Bet < ${defaultRange.lessRange}`)}
        </Button>
          <Button primary onClick={() => console.log('hello')}>
              {$t(`Bet > ${defaultRange.moreRange}`)}
          </Button>
        <div className={'bet-card__buttons_currency'}>
          {$t('BTC')}
        </div>
      </div>
  )
}