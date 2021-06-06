import React from 'react';
import './Input.scss'

interface InputProps {
  children?: React.ReactNode,
  placeholder: string,
  type: string,
  value: string | number,
  name?: string,
  disabled?: boolean,
  onChange: (e: string) => void
}

export const Input = ({
  children,
  placeholder,
  type,
  value,
  name,
  disabled,
  onChange
}: InputProps) => {

  let className = 'input'

  if (disabled) {
    className+= ' input-disabled'
  }

  return (
    <label>
      {children}
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}