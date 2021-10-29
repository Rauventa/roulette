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
import { Card } from '../../components/Card/Card';

export const FaucetPage = () => {

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  const timeout = useSelector((state: any) => state.faucetReducer.timeout)
  const winData = useSelector((state: any) => state.faucetReducer.winData)

  const [animation, setAnimation] = useState<string>('')

  const fetchData = async () => {
    await dispatch(getFaucetTimeout(token))
  }

  console.log('winData ', winData)

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
            value={winData?.number}
          />

          {winData?.gain!==0?
            <Card className="faucet-gain-card" title={`You rolled ${winData?.number}`}>
              Your gain {winData?.gain}
            </Card>
            :
            null
          }
          

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