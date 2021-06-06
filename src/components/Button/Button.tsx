import React from 'react';
import './Button.scss'
import { NavLink } from 'react-router-dom';

interface ButtonProps {
  primary?: boolean,
  secondary?: boolean,
  disabled?: boolean,

  onClick?: () => void,

  href?: any,

  children: React.ReactNode
}

export const Button = ({
  primary,
  secondary,
  disabled,
  onClick,
  href,
  children
}: ButtonProps) => {

  const returnClickHandler = () => {
    if (onClick) {
      onClick()
    }
  }

  let className = 'btn'

  if (primary) {
    className+= ' btn-primary'
  }

  if (secondary) {
    className+= ' btn-secondary'
  }

  if (disabled) {
    className+= ' btn-disabled'
  }

  if (href) {
    return (
      <NavLink
        to={href}
        className={className}
      >
        {children}
      </NavLink>
    )
  } else {
    return (
      <button
        className={className}
        disabled={disabled}
        onClick={returnClickHandler}
      >
        {children}
      </button>
    )
  }
}