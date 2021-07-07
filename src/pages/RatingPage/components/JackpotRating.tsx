import React from 'react';
import { Card } from '../../../components/Card/Card';
import {ReactComponent as JackpotIcon} from "../img/btc-ico.svg";

export const JackpotRating = () => {
    return (
        <Card
            title={'Top Jackpot'}
            icon={
                <JackpotIcon />
            }
        >

        </Card>
    )
}