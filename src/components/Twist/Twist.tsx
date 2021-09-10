import React from 'react';
import { t } from '../../lib/i18n';
import { Card } from '../Card/Card';
import './Twist.scss'

interface TwistProps {
  className?: string;
  value: number
}

export const Twist = ({
  className,
  value
}: TwistProps) => {

  const data = value.toString().split('')

  return (
    <Card className={`${className || ''} twist`}>
      <div className={'twist__container'}>
        {data.map((item: any, index: number) =>
            <div key={index+item} className={'twist__container_item'}>
              {t(item)}
            </div>
        )}
      </div>
    </Card>
  )
}