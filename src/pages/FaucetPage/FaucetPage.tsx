import React from 'react';
import './FaucetPage.scss'
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {FaucetResults} from "../../containers/FaucetResults/FaucetResults";
import {TimeLine} from "../../components/TimeLine/TimeLine";

export const FaucetPage = () => {
  return (
    <div className={'faucet-page'}>

      <div className="faucet-page__content">
        <StatsRow />

        <TimeLine
          progress={50}
        />

        <FaucetResults />
      </div>
    </div>
  )
}