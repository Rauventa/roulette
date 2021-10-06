import React, {useState} from "react";
import { t } from "../../lib/i18n";

import './RadioGroup.scss'

interface RadioGroupProps {
    title?: string,
    values: any,
    defaultValue: any,
    onChange?: (type: any) => void
}

export const RadioGroup = ({
    title,
    values,
    defaultValue,
    onChange
}: RadioGroupProps) => {

    const [formState, setFormState] = useState<string>(defaultValue || '')

    const handleChange = (type: any) => {
        setFormState(type)

        if (onChange) {
            onChange(type)
        }
    }

    return (
        <div className={'radio-group'}>

            {title ?
                <div className="radio-group__title">
                    {t(`${title}`)}
                </div> : null
            }

            {values.map((item: any, index: number) => {
                return (
                    <div key={index} className="radio-group__element">
                        <input
                            type="radio"
                            id={item}
                            value={item}
                            checked={item === formState || false}
                            onChange={(event) => handleChange(event.target.value)}
                        />
                        <label htmlFor={item}>
                            {t(`${item}`)}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}