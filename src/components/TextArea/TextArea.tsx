import React from 'react';

import './TextArea.scss'

interface TextAreaProps {
  className?: string,
  value: string,
  placeholder: string,
  onChange: (e: string) => void
}

export const TextArea = ({
  className,
  value,
  placeholder,
  onChange
}: TextAreaProps) => {

  const handleChange = (value: any) => {
    onChange(value)
  }

  return (
    <textarea
      className={`textarea ${className || ''}`}
      value={value}
      placeholder={placeholder}
      onChange={(event) => handleChange(event.target.value)}
    />
  )
}