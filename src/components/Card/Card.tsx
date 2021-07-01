import React from 'react';
import './Card.scss'
import {useTranslation} from "react-i18next";

interface CardProps {
  children: React.ReactNode,
  title?: string,
  className?: string
}

export const Card = ({
  children,
  title,
  className
}: CardProps) => {

  const {t} = useTranslation()

  return (
    <div className={`card ${className ? className : ''}`}>
      {title ?
        <div className="card__title">
          {t(title)}
        </div> : null
      }

      <div className="card__content">
        {children}
      </div>
    </div>
  )
}