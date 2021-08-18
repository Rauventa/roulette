import React, {useContext, useEffect} from 'react';
import './FaucetPage.scss'
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {FaucetResults} from "../../containers/FaucetResults/FaucetResults";
import {TimeLine} from "../../components/TimeLine/TimeLine";
import {FaucetWins} from "./components/FaucetWins";
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../context/AuthContext";
import {getFaucetTimeout} from "../../store/actions/Faucet/faucetActions";

export const FaucetPage = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const timeout = useSelector((state: any) => state.faucetReducer.timeout)

  const fetchData = async () => {
    await dispatch(getFaucetTimeout(token))
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className={'faucet-page'}>

      <StatsRow />
      <TimeLine
        seconds={timeout}
      />

      <div className="faucet-page__content">

        <div className="faucet-page__content_left">
          <FaucetWins />
        </div>

        <div className="faucet-page__content_right">
          <FaucetResults />
        </div>
      </div>
    </div>
  )
}