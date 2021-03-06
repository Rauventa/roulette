import React from 'react';
import './LogoWheel.scss'

export const LogoWheel = () => {

  const slots = [32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26,0]

  return (
    <div className={'btcAnimatedLogo'}>
      <div className={'btcLogoWheel'}/>
      <div className={'plate'}>
        <ul className={'inner'}>
          {slots.map(index => {
            return (
              <li key={index} className={'number'}/>
            )
          })}
        </ul>
      </div>
    </div>
  )
}