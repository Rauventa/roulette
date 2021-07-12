import React from 'react';
import {$t} from "../../../lib/i18n";
import {ReactComponent as DefaultIcon} from "./img/btc-ico.svg";
import {toDotThs} from "../../../lib/numberRefractor";

interface StatsRowItemProps {
  title: string,
  value: number
}

export const StatsRowItem = ({
  title,
  value
}: StatsRowItemProps) => {

  return (
    <>
      {title === 'topJackpot' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <DefaultIcon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
                 <span className={'stats-row__item_text-title--dollar'}>
                        {$t('$')}
                 </span>
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Top jackpot')}
            </div>
          </div>
        </div> : null
      }

      {title === 'paidTotal' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <DefaultIcon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
                 <span className={'stats-row__item_text-title--dollar'}>
                   {$t('$')}
                 </span>
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Paid total')}
            </div>
          </div>
        </div> : null
      }

      {title === 'gamesToday' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <DefaultIcon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Games today')}
            </div>
          </div>
        </div> : null
      }

      {title === 'gamesTotal' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <DefaultIcon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Games total')}
            </div>
          </div>
        </div> : null
      }

      {title === 'topLuck' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <DefaultIcon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              {$t(`${toDotThs(value)}`)}
              <span className={'stats-row__item_text-title--percent'}>
                {$t('%')}
              </span>
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Top luck')}
            </div>
          </div>
        </div> : null
      }

      {title === 'maxBet' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <DefaultIcon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              <span className={'stats-row__item_text-title--dollar'}>
                {$t('$')}
              </span>
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Max bet')}
            </div>
          </div>
        </div> : null
      }

      {title === 'wonTotal' ?
        <div className={'stats-row__item'}>
          <div className="stats-row__item_icon">
            <DefaultIcon />
          </div>
          <div className="stats-row__item_text">
            <div className="stats-row__item_text-title">
              <span className={'stats-row__item_text-title--dollar'}>
                {$t('$')}
              </span>
              {$t(`${toDotThs(value)}`)}
            </div>
            <div className="stats-row__item_text-subtitle">
              {$t('Won total')}
            </div>
          </div>
        </div> : null
      }
    </>
  )
}