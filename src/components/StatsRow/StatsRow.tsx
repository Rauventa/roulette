import React, {useContext, useEffect} from 'react';

import {StatsRowItem} from "./StatsRowItem/StatsRowItem";
import './StatsRow.scss'
import {useDispatch, useSelector} from "react-redux";
import {getStats} from "../../store/actions/Stats/statsActions";
import {AuthContext} from "../../context/AuthContext";

export const StatsRow = () => {

  const dispatch = useDispatch()

  const {token} = useContext(AuthContext)

  const stats = useSelector((state: any) => state.statsReducer.stats)

  useEffect(() => {
    dispatch(getStats(token))
  }, []);

  const data = Object.entries(stats).map((item: any) => {
    return {
      title: item[0],
      value: item[1]
    }
  })

    return (
        <div className={'stats-row'}>
          {data.map((item: any, index: number) => {
            return (
              <StatsRowItem
                key={index}
                title={item.title}
                value={item.value}
              />
            )
          })}
        </div>
    )
}