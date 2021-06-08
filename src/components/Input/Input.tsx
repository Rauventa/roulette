import React from 'react';
import { $t } from '../../lib/i18n';
import './Input.scss'

interface InputProps {
  className?: string,
  title?: string,
  placeholder: string,
  type: string,
  value: string | number,
  name?: string,
  disabled?: boolean,
  errors?: any,
  onChange: (e: string) => void
}

export const Input = ({
  className,
  title,
  placeholder,
  type,
  value,
  name,
  disabled,
  errors,
  onChange
}: InputProps) => {

  let defaultClass = 'input'

  if (disabled) {
    defaultClass+= ' input-disabled'
  }

  return (
    <div className={'input-group'}>
      {title ?
        <div className="input-group__title">
          {$t(title)}
        </div> : null
      }
      <input
        className={`${defaultClass} ${className ? className : ''}`}
        placeholder={$t(placeholder)}
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="input-group__errors">
        {$t(errors)}
      </div>
    </div>
  )
}