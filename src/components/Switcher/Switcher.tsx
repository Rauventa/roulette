import React from 'react';
import './Swither.scss';
import Switch from "react-switch";
import { t } from '../../lib/i18n';

interface SwitcherProps {
    className?: string,
    title?: string,
    checked: boolean,
    onChange: (checked: boolean) => void
}

export const Switcher = ({
    className,
    title,
    checked,
    onChange
}: SwitcherProps) => {

    const defaultSwitchProps = {
        checkedIcon: false,
        uncheckedIcon: false,
        onColor: '#fe8806',
        offColor: '#313249'
    }

    const handleChange = (value: boolean) => {
        onChange(value)
    }

    return (
        <div className={`switcher ${className || ''}`}>
            <Switch
                {...defaultSwitchProps}
                onChange={handleChange}
                checked={checked}
            />
            {title ?
                <div className={'switcher__title'}>
                    {t(title)}
                </div> : null
            }
        </div>
    )
}