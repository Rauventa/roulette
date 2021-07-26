import React, {useContext, useEffect, useState} from 'react';
import'./ProfileSettings.scss';
import { Card } from '../../../../components/Card/Card';
import {Input} from "../../../../components/Input/Input";
import {FileInput} from "../../../../components/FileInput/FileInput";
import { Button } from '../../../../components/Button/Button';
import { $t } from '../../../../lib/i18n';

import DefaultIcon from './img/default.png';

import {ReactComponent as PenIcon} from "./img/pen.svg";

import {useDispatch, useSelector} from "react-redux";
import {
    changeNickname, changePassword,
    getAvatar,
    getNicknameVisibility,
    uploadAvatar
} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";
import {config} from "../../../../config/config";
import {Checkbox} from "../../../../components/Checkbox/Checkbox";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../../../components/Spinner/Spinner";

export const ProfileSettings = () => {

    const defaultFormState = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
    }

    const dispatch = useDispatch()

    const {token, nickname} = useContext(AuthContext)

    const nicknameVisibility = useSelector((state: any) => state.profileReducer.nicknameVisibility)
    const avatar = useSelector((state: any) => state.profileReducer.avatar)

    const [formState, setFormState] = useState<any>(defaultFormState)
    const [formErrors, setFormErrors] = useState<any>({})
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoader(true)

        await dispatch(getNicknameVisibility(token))
        await dispatch(getAvatar(token))

        setLoader(false)
    }

    const formChangeHandler = (value: any, iterator: string) => {
        switch (iterator) {
            case 'old-password':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        oldPassword: value
                    }
                })
                break;
            case 'password':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        password: value
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

    const handleSubmit = async (type: string) => {
        setLoader(true)

        if (type === 'password') {
            await dispatch(changePassword(token, {...formState}))
        }

        setLoader(false)
    }

    const changeNicknameVisibility = async (hide: boolean) => {
        setLoader(true)

        await dispatch(changeNickname(token, {nickname, hide}))
        await dispatch(getNicknameVisibility(token))

        setLoader(false)
    }

    const savePicHandler = async (data: any) => {
        const formData = new FormData()
        formData.append('File', data)

        setLoader(true)

        await dispatch(uploadAvatar(token, formData))
        await dispatch(getAvatar(token))

        setLoader(false)
    }

    return (
        <>
            <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
                <Spinner />
            </CSSTransition>

            <Card>
                <div className={'user-card'}>
                    <div className="user-card__main">
                        <div className="user-card__icon">
                            <FileInput
                                id={'photo-setting-input'}
                                name={'photo-setting-input'}
                                defaultImage={avatar ? `${config.apiPhotoPrefixUrl}/${avatar}` : DefaultIcon}
                                onChange={savePicHandler}
                            />
                            <div className="user-card__icon_hover">
                                <PenIcon />
                            </div>
                        </div>
                        <div className="user-card__info">
                            <div className="user-card__info_name">
                                {nickname}
                            </div>
                            <div className="user-card__info_balance">
                                {`balance`}
                            </div>
                        </div>
                    </div>
                    <div className="user-card__nickname">
                        <Checkbox
                            checked={nicknameVisibility}
                            onChange={(value) => changeNicknameVisibility(value)}
                        >
                            Hide my nickname
                        </Checkbox>
                    </div>
                </div>
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
                <Button primary onClick={() => handleSubmit('main')}>
                    {$t('Save')}
                </Button>
            </Card>
            <Card title={'Change password'}>
                <div className={'input-group'}>
                    <Input
                        title={'Current password'}
                        placeholder={'Current password'}
                        type={'password'}
                        value={formState.oldPassword}
                        onChange={(value) => formChangeHandler(value, 'old-password')}
                    />
                    <Input
                        title={'New password'}
                        placeholder={'New password'}
                        type={'password'}
                        value={formState.password}
                        onChange={(value) => formChangeHandler(value, 'password')}
                    />
                    <Input
                        title={'Confirm password'}
                        placeholder={'Confirm password'}
                        type={'password'}
                        value={formState.confirmPassword}
                        onChange={(value) => formChangeHandler(value, 'confirm-password')}
                    />
                </div>
                <Button primary onClick={() => handleSubmit('password')}>
                    {$t('Save')}
                </Button>
            </Card>
        </>
    )
}