import React from 'react';
import {StatsRowItem} from "./StatsRowItem/StatsRowItem";
import './StatsRow.scss'

export const StatsRow = () => {

    return (
        <div className={'stats-row'}>
            <StatsRowItem />
            <StatsRowItem />
            <StatsRowItem />
            <StatsRowItem />
            <StatsRowItem />
            <StatsRowItem />
        </div>
    )
}