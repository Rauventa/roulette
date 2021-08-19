import React, {useContext, useEffect, useState} from 'react';
import './FaucetPage.scss'
import {StatsRow} from "../../components/StatsRow/StatsRow";
import {FaucetResults} from "../../containers/FaucetResults/FaucetResults";
import {TimeLine} from "../../components/TimeLine/TimeLine";
import {FaucetWins} from "./components/FaucetWins";
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../context/AuthContext";
import {getFaucetTimeout} from "../../store/actions/Faucet/faucetActions";
import {Twist} from "../../components/Twist/Twist";

export const FaucetPage = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const timeout = useSelector((state: any) => state.faucetReducer.timeout)
  const number = useSelector((state: any) => state.faucetReducer.winNumber)

  const [animation, setAnimation] = useState<string>('')

  const fetchData = async () => {
    await dispatch(getFaucetTimeout(token))
  }

  console.log(timeout, number)

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
          <Twist
            className={animation}
            value={number}
          />
          <FaucetWins
            onRoll={(value: string) => setAnimation(value)}
          />
        </div>

        <div className="faucet-page__content_right">
          <FaucetResults />
        </div>
      </div>
    </div>
  )
}