import React from 'react';
import './Range.scss'

interface RangeProps {
  onChange: (value: number) => void;
  max: number;
  min: number;
  value: number;
}

export const Range = ({
  onChange,
  max,
  min,
  value
}: RangeProps) => {

  const handleChange = (e: any) => {
    onChange(e.target.value)
  }

  return (
    <div className={'slider'}>
      <div className={'slide'} style={{width: `calc((100% - 20px) * ${Number(value) / 100})`}} />
      <input
        className={'range'}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}