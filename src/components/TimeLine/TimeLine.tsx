import React, {useEffect, useState} from 'react';
import { dateFromSeconds } from '../../lib/dateFormater';
import './TimeLine.scss';
import {useTranslation} from "react-i18next";

interface TimeLineProps {
  seconds: number,
  text?: string
}

export const TimeLine = ({
  seconds,
  text
}: TimeLineProps) => {

  const [width, setWidth] = useState<any>(1)
  const [time, setTime] = useState<any>(0)

  const {t} = useTranslation()

  useEffect(() => {
    setTime(seconds)

    if (seconds === 0) {
      setWidth(100)
    } else {
      setWidth(1)
    }
  }, [seconds]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        setWidth(width + (100 - width)/time)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className={'timeline'}>
      <div className="timeline__backdrop">
        <div className={'timeline__backdrop_name'}>
          {t('Start')}
        </div>
        <div className="timeline__backdrop_text">
          {t(`${time !== 0 ? text : ''}`)}
        </div>
        <div className="timeline__backdrop_time">
          {t(time === 0 ? '' : dateFromSeconds(time))}
        </div>
      </div>
      <div
        className="timeline__bar"
        style={{width: `${width}%`}}
      >
        <div className="timeline__bar_overflow">
          {t('overflow')}
        </div>
      </div>
    </div>
  )
}