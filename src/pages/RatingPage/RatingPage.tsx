import React from 'react';
import './RatingPage.scss';
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {JackpotRating} from "./components/JackpotRating";
import {MaxGamesRating} from "./components/MaxGamesRating";
import {LuckRating} from "./components/LuckRating";

export const RatingPage = () => {
    return (
        <div className={'rating-page'}>
            <StatsRow />

            <div className="rating-page__content">
                <JackpotRating />
                <MaxGamesRating />
                <LuckRating />
            </div>
        </div>
    )
}