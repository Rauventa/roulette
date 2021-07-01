import React from 'react';
import './Input.scss'
import {useTranslation} from "react-i18next";

interface InputProps {
  className?: string,
  title?: string,
  placeholder: string,
  type: string,
  value: string | number,
  name?: string,
  disabled?: boolean,
  errors?: any,
  onChange?: (e: string) => void
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

  const {t} = useTranslation()

  let defaultClass = 'input'

  if (disabled) {
    defaultClass+= ' input-disabled'
  }

  const handleChange = (value: any) => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={'input-group'}>
      {title ?
        <div className="input-group__title">
          {t(title)}
        </div> : null
      }
      <input
        className={`${defaultClass} ${className ? className : ''}`}
        placeholder={t(placeholder)}
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      />
      <div className="input-group__errors">
        {t(errors)}
      </div>
    </div>
  )
}