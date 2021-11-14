import React from 'react';
import './Select.scss';
import ReactSelect, {components, PlaceholderProps} from 'react-select';
import {useTranslation} from "react-i18next";

interface SelectProps {
  className?: string,
  title?: string,
  options: any,
  value: any,
  placeholder?: any,
  isClearable?:boolean, 
  onChange: (value: any) => void;
  noMessage?: string
}

const Placeholder = (props: any) => {
  return <components.Placeholder {...props} />;
};

export const Select = ({
  className,
  title,
  options,
  value,
  placeholder,
  onChange,
  noMessage,
  isClearable,
}: SelectProps) => {

  const handleChange = (newValue: any) => {
    onChange(newValue)
  }

  const {t} = useTranslation()

  const noOptionsMessage = noMessage || 'No options'

  return (
    <div className={'input-group'}>
      {title ?
        <div className="input-group__title">
          {t(`${title}`)}
        </div> : null
      }

      <ReactSelect
        components={{ Placeholder }}
        className={`select-container ${className || ''}`}
        classNamePrefix="select"
        options={options}
        isClearable={isClearable || false}
        placeholder={placeholder ? placeholder : ''}
        value={value}
        onChange={handleChange}
        noOptionsMessage={() => noOptionsMessage}
      />
    </div>
  )
}