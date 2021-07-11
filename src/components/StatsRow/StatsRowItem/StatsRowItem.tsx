import React from 'react';
import {$t} from "../../../lib/i18n";
import {ReactComponent as DefaultIcon} from "./img/btc-ico.svg";

export const StatsRowItem = () => {
    return (
        <div className={'stats-row__item'}>
            <div className="stats-row__item_icon">
                <DefaultIcon />
            </div>
            <div className="stats-row__item_text">
                <div className="stats-row__item_text-title">
                    <span className={'stats-row__item_text-title--dollar'}>
                        {$t('$')}
                    </span>
                    {$t('42,1k')}
                </div>
                <div className="stats-row__item_text-subtitle">
                    {$t('Top jackpot')}
                </div>
            </div>
        </div>
    )
}