import React from 'react';
import './Select.scss';
import ReactSelect from 'react-select';
import {useTranslation} from "react-i18next";

interface SelectProps {
  className?: string,
  title?: string,
  options: any,
  value: any,
  placeholder?: any,
  onChange: (value: any) => void;
  noMessage?: string
}

export const Select = ({
  className,
  title,
  options,
  value,
  placeholder,
  onChange,
  noMessage
}: SelectProps) => {

  const {t} = useTranslation()

  const handleChange = (newValue: any) => {
    onChange(newValue)
  }

  const noOptionsMessage = noMessage || 'No options'

  return (
    <div className={'input-group'}>
      {title ?
        <div className="input-group__title">
          {t(title)}
        </div> : null
      }

      <ReactSelect
        className={`select-container ${className || ''}`}
        classNamePrefix="select"
        options={options}
        placeholder={placeholder ? t(placeholder) : ''}
        value={value}
        onChange={handleChange}
        noOptionsMessage={() => noOptionsMessage}
      />
    </div>
  )
}