import React from 'react';
import { $t } from '../../lib/i18n';
import './Card.scss'

interface CardProps {
  children: React.ReactNode,
  title?: string,
  icon?: any,
  className?: string
}

export const Card = ({
  children,
  title,
  icon,
  className
}: CardProps) => {

  return (
    <div className={`card ${className ? className : ''}`}>
      {title ?
        <div className="card__title">
          <div className="card__title_icon">
            {icon}
          </div>
          <div className="card__title_text">
            {$t(title)}
          </div>
        </div> : null
      }

      <div className="card__content">
        {children}
      </div>
    </div>
  )
}