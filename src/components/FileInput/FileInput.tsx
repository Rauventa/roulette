import React, {useState} from 'react';
import { $t } from '../../lib/i18n';
import './FileInput.scss'

interface FileInputProps {
    id: string,
    name?: string,
    label: string,
    extra?: any,
    onChange: (value: any) => void,
}

export const FileInput = ({
    id,
    name,
    label,
    extra,
    onChange,
}: FileInputProps) => {

    const defaultImageSrc = 'https://avrorasochi.ru/wp-content/uploads/2016/10/orionthemes-placeholder-image.jpg';

    const [file, setFile] = useState<any>(null)

    const imageChangeHandler = (e: any) => {
        setFile(e.target.files[0])

        onChange(e.target.files[0])
    }

  console.log(file)

    return (
        <>
            <label
                htmlFor={id}
            >
                {$t(label)}

                <img src={file ? URL.createObjectURL(file) : defaultImageSrc} alt=""/>
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