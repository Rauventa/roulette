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
  defaultLink?: boolean,

  target?: string,

  className?: string,

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
  target,
  defaultLink,
  className,
  children
}: ButtonProps) => {

  const returnClickHandler = () => {
    if (onClick) {
      onClick()
    }
  }

  let classDefault = 'btn'

  if (primary) {
    classDefault+= ' btn-primary'
  }

  if (secondary) {
    classDefault+= ' btn-secondary'
  }

  if (light) {
    classDefault+= ' btn-light'
  }

  if (dark) {
    classDefault+= ' btn-dark'
  }

  if (disabled) {
    classDefault+= ' btn-disabled'
  }

  if (defaultLink) {
    return (
      <a
        href={href}
        target={target ? target : '_self'}
        className={`${classDefault} ${className ? className : ''}`}
      >
        {children}
      </a>
    )
  } else if (href) {
    return (
      <NavLink
        to={href}
        className={`${classDefault} ${className ? className : ''}`}
      >
        {children}
      </NavLink>
    )
  } else {
    return (
      <button
        className={`${classDefault} ${className ? className : ''}`}
        disabled={disabled}
        onClick={returnClickHandler}
      >
        {children}
      </button>
    )
  }
}