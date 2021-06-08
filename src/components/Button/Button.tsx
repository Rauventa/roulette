import React from 'react';
import './Button.scss'
import { NavLink } from 'react-router-dom';

interface ButtonProps {
  primary?: boolean,
  secondary?: boolean,
  light?: boolean,
  dark?: boolean,
  disabled?: boolean,

  onClick?: () => void,

  href?: any,

  children: React.ReactNode
}

export const Button = ({
  primary,
  secondary,
  light,
  dark,
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

  if (light) {
    className+= ' btn-light'
  }

  if (dark) {
    className+= ' btn-dark'
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