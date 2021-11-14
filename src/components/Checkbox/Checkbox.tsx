import React from 'react';
import './Checkbox.scss'

interface CheckboxProps {
  children: React.ReactNode,
  checked: boolean,
  errors?:any,
  onChange: (value: boolean) => void
}

export const Checkbox = ({
  children,
  checked,
  errors,
  onChange
}: CheckboxProps) => {

  const handleChange = (value: boolean) => {
    onChange(value)
  }

  return (
    <>
      <div className={`checkbox`}>
        <input
          className={'checkbox__input'}
          type="checkbox"
          checked={checked}
          onChange={(event) => handleChange(event.target.checked)} />
        <label className={'checkbox__label'}>
          {children}
        </label>
      </div>
      {errors?
        <div className={`checkbox__error`}>
          {errors}
        </div>
      :
      null
      }
    </>
  )
}