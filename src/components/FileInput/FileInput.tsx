import React, {ReactNode, useState} from 'react';
import { t } from '../../lib/i18n';
import './FileInput.scss'

interface FileInputProps {
    id: string,
    name?: string,
    label?: string,
    defaultImage?: any,
    extra?: any,
    onChange: (value: any) => void,
}

export const FileInput = ({
    id,
    name,
    label,
    defaultImage,
    extra,
    onChange,
}: FileInputProps) => {

    const [file, setFile] = useState<any>(null)

    const imageChangeHandler = (e: any) => {
        setFile(e.target.files[0])

        onChange(e.target.files[0])
    }

    return (
        <>
            <label
                htmlFor={id}
            >
                {label ?
                    t(label) : null
                }
                <img src={file ? URL.createObjectURL(file) : defaultImage} alt=""/>
            </label>
            <input
                className={'input-file'}
                type="file"
                onChange={(e) => imageChangeHandler(e)}
                name={name ? name : ''}
                id={id}
            />
        </>
    )
}