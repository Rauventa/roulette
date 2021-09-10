import React from 'react';
import './Card.scss'
import {useTranslation} from "react-i18next";

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

  const {t} = useTranslation()

  return (
    <div className={`card ${className ? className : ''}`}>
      {title ?
        <div className="card__title">
          <div className={`card__title_icon ${!icon ? 'disable' : ''}`}>
            {icon}
          </div>
          <div className="card__title_text">
            {t(`${title}`)}
          </div>
        </div> : null
      }

      <div className="card__content">
        {children}
      </div>
    </div>
  )
}