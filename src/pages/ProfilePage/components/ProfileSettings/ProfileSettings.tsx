import React, {useContext, useState} from 'react';
import { Card } from '../../../../components/Card/Card';
import {Input} from "../../../../components/Input/Input";
import {FileInput} from "../../../../components/FileInput/FileInput";
import { Button } from '../../../../components/Button/Button';
import { $t } from '../../../../lib/i18n';
import {useDispatch} from "react-redux";
import {uploadAvatar} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";

export const ProfileSettings = () => {

    const defaultFormState = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const dispatch = useDispatch()

    const {token} = useContext(AuthContext)

    const [formState, setFormState] = useState<any>(defaultFormState)
    const [formErrors, setFormErrors] = useState<any>({})
    const [loader, setLoader] = useState<boolean>(false)

    const formChangeHandler = (value: any, iterator: string) => {
        switch (iterator) {
            case 'current-password':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        currentPassword: value
                    }
                })
                break;
            case 'new-password':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        newPassword: value
                    }
                })
                break;
            case 'confirm-password':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        confirmPassword: value
                    }
                })
                break;
        }
    }

    const savePicHandler = async (data: any) => {
        dispatch(uploadAvatar(token, data))
    }

    return (
        <>
            <Card title={'Photo'}>
                <FileInput
                    id={'photo-setting-input'}
                    name={'photo-setting-input'}
                    label={'Upload photo'}
                    onChange={savePicHandler}
                />
            </Card>
            <Card title={'Main'}>
                <div className={'input-group'}>
                    <Input
                        title={'Email'}
                        placeholder={'Email'}
                        type={'text'}
                        value={''}
                        disabled
                    />
                    <Input
                        title={'Nickname'}
                        placeholder={'Nickname'}
                        type={'text'}
                        value={''}
                        disabled
                    />
                    <Input
                        title={'Phone'}
                        placeholder={'Phone'}
                        type={'text'}
                        value={''}
                        disabled
                    />
                </div>
            </Card>
            <Card title={'Change password'}>
                <div className={'input-group'}>
                    <Input
                        title={'Current password'}
                        placeholder={'Current password'}
                        type={'password'}
                        value={formState.currentPassword}
                        onChange={(value) => formChangeHandler(value, 'current-password')}
                    />
                    <Input
                        title={'New password'}
                        placeholder={'New password'}
                        type={'password'}
                        value={formState.newPassword}
                        onChange={(value) => formChangeHandler(value, 'new-password')}
                    />
                    <Input
                        title={'Confirm password'}
                        placeholder={'Confirm password'}
                        type={'password'}
                        value={formState.confirmPassword}
                        onChange={(value) => formChangeHandler(value, 'confirm-password')}
                    />
                </div>
            </Card>
        </>
    )
}