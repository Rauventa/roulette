import React, { useEffect } from 'react';
import {useDispatch} from "react-redux";
import {getCurrentRate} from "../../store/actions/Balance/balanceActions";

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

  return children
}