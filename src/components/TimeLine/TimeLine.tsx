import React, {useEffect, useRef, useState} from 'react';
import {$t} from '../../lib/i18n';
import './TimeLine.scss';

interface TimeLineProps {
  progress: number
}

export const TimeLine = ({
  progress
}: TimeLineProps) => {

  const [width, setWidth] = useState<any>(50)
  const [time, setTime] = useState<any>(0)

  // const interval: any = useRef(null)
  //
  // interval.current = setInterval(() => {
  //   setTime(time + 1)
  // }, 1000)
  //
  // useEffect(() => {
  //   // if (time >= 60) {
  //   //   clearInterval(interval.current)
  //   // }
  // }, []);

  return (
    <div className={'timeline'}>
      <div className="timeline__backdrop">
        <div className={'timeline__backdrop_name'}>
          {$t('Start')}
        </div>
        <div className="timeline__backdrop_time">
          {$t(`${time}s`)}
        </div>
      </div>
      <div
        className="timeline__bar"
        style={{width: `${width}%`}}
      >
        <div className="timeline__bar_overflow">
          {$t('overflow')}
        </div>
      </div>
    </div>
  )
}