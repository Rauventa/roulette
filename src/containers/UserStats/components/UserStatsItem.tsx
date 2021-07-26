import React from 'react';
import {$t} from "../../../lib/i18n";
import {toDotThs} from "../../../lib/numberRefractor";
import {ReactComponent as Card3Icon} from "../../../components/StatsRow/StatsRowItem/img/card-3.svg";
import {ReactComponent as Card2Icon} from "../../../components/StatsRow/StatsRowItem/img/card-2.svg";
import {ReactComponent as Card4Icon} from "../../../components/StatsRow/StatsRowItem/img/card-4.svg";

interface UserStatsItemProps {
    title: string,
    value: number
}

export const UserStatsItem = ({
    title,
    value
}: UserStatsItemProps) => {
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
            {title === 'wonTotal' ?
                <div className={'stats-row__item'}>
                    <div className="stats-row__item_icon">
                        <Card2Icon />
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