import React from 'react';
import {useTranslation} from "react-i18next";
import PhoneInput from "react-phone-input-2";

import 'react-phone-input-2/lib/style.css'
import './Input.scss';
interface InputProps {
  className?: string,
  title?: string,
  placeholder: string,
  type: string,
  value: string | number,
  name?: string,
  country?: string ,
  disabled?: boolean,
  errors?: any,
  icon?: any,
  onCopy?: (copied: any) => void,
  onChange?: (e: string) => void
}

export const Input = ({
  className,
  title,
  placeholder,
  type,
  value,
  name,
  country,
  disabled,
  errors,
  icon,
  onCopy,
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

  const handleCopy = () => {
    if (onCopy) {
      onCopy(value)
    }
  }

  return (
    <div className={'input-group'}>
      {title ?
        <div className="input-group__title">
          {t(`${title}`)}
        </div> : null
      }
      {icon ?
          <div className={'input-group__icon'} onClick={handleCopy}>
            {icon}
          </div> : null
      }
      {type === 'phone' ?
          <PhoneInput
              containerClass={errors?'react-tel-input-error':''}
              placeholder={t(`${placeholder}`)}
              type={type}
              name={name}
              max={10}
              // defaultCountry={country}
              disabled={disabled}
              //@ts-ignore
              value={value}
              onChange={handleChange}
          /> :
          <input
              className={`${defaultClass} ${className || ''}`}
              placeholder={t(`${placeholder}`)}
              type={type}
              name={name}
              disabled={disabled}
              value={value}
              onChange={(event) => handleChange(event.target.value)}
          />
      }
      {errors ?
          <div className="input-group__errors">
            {t(`${errors}`)}
          </div> : null
      }
    </div>
  )
}