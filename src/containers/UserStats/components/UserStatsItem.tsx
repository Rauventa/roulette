import React from 'react';
import {$t} from "../../../lib/i18n";
import {currencyValueChanger, toDotThs} from "../../../lib/numberRefractor";
import {ReactComponent as Card3Icon} from "../../../components/StatsRow/StatsRowItem/img/card-3.svg";
import {ReactComponent as Card2Icon} from "../../../components/StatsRow/StatsRowItem/img/card-2.svg";
import {ReactComponent as Card4Icon} from "../../../components/StatsRow/StatsRowItem/img/card-4.svg";
import {useSelector} from "react-redux";
import { getTicker } from '../../../lib/tickers';

interface UserStatsItemProps {
    title: string,
    value: number
}

export const UserStatsItem = ({
    title,
    value
}: UserStatsItemProps) => {

    const currency = useSelector((state: any) => state.balanceReducer.currency)
    const rate = useSelector((state: any) => state.balanceReducer.rate)

    return (
        <>
            {title === 'gamesTotal' ?
                <div className={'stats-row__item'}>
                    <div className="stats-row__item_icon">
                        <Card3Icon />
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
            {title === 'paidTotal' ?
                <div className={'stats-row__item'}>
                    <div className="stats-row__item_icon">
                        <Card2Icon />
                    </div>
                    <div className="stats-row__item_text">
                        <div className="stats-row__item_text-title">
                             <span className={'stats-row__item_text-title--dollar'}>
                                 {$t(`${getTicker(currency, {shortTickers: true})}`)}
                             </span>
                            {$t(`${toDotThs(currencyValueChanger(currency, rate, value))}`)}
                        </div>
                        <div className="stats-row__item_text-subtitle">
                            {$t('Paid total')}
                        </div>
                    </div>
                </div> : null
            }
            {title === 'wonTotal' ?
                <div className={'stats-row__item'}>
                    <div className="stats-row__item_icon">
                        <Card2Icon />
                    </div>
                    <div className="stats-row__item_text">
                        <div className="stats-row__item_text-title">
                             <span className={'stats-row__item_text-title--dollar'}>
                                 {$t(`${getTicker(currency, {shortTickers: true})}`)}
                             </span>
                            {$t(`${toDotThs(currencyValueChanger(currency, rate, value))}`)}
                        </div>
                        <div className="stats-row__item_text-subtitle">
                            {$t('Won total')}
                        </div>
                    </div>
                </div> : null
            }
            {title === 'topLuck' ?
                <div className={'stats-row__item'}>
                    <div className="stats-row__item_icon">
                        <Card4Icon />
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
        </>
    )
}