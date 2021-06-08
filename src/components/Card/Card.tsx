import React from 'react';
import './Card.scss'

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
  return (
    <div className={`card ${className ? className : ''}`}>
      {title ?
        <div className="card__title">
          {title}
        </div> : null
      }

      <div className="card__content">
        {children}
      </div>
    </div>
  )
}