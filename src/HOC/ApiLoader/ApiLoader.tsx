import React, { useEffect } from 'react';
import {useDispatch} from "react-redux";
import {getCurrentRate} from "../../store/actions/Balance/balanceActions";
import {useStats} from "../../hooks/useStats.hook";
import { useRoulette } from '../../hooks/useRoulette.hook';
import {useFaucet} from "../../hooks/useFaucet.hook";
// import {useRoulette} from "../../hooks/useRoulette.hook";

interface ApiLoaderProps {
  children: any
}

export const ApiLoader = ({
  children
}: ApiLoaderProps) => {

  const getRateTimeout = 60 * 1000

  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      await dispatch(getCurrentRate('usd'))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  setInterval(async () => {
    fetchData()
  }, getRateTimeout)

  // socket stats updating
  useStats()

  //socket faucet updating
  useFaucet()

  //socket roulette updating
  useRoulette()

  return children
}