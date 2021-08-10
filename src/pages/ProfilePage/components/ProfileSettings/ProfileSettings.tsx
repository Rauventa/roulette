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
    changeEmail,
    changeNickname, changePassword,
    getAvatar,
    getNicknameVisibility, getProfileInfo,
    uploadAvatar
} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";
import {config} from "../../../../config/config";
import {Checkbox} from "../../../../components/Checkbox/Checkbox";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {getTicker} from "../../../../lib/tickers";
import {Switcher} from "../../../../components/Switcher/Switcher";

export const ProfileSettings = () => {

    const dispatch = useDispatch()

    const {token} = useContext(AuthContext)

    const nicknameVisibility = useSelector((state: any) => state.profileReducer.nicknameVisibility)
    const profileInfo = useSelector((state: any) => state.profileReducer.profileInfo)
    const avatar = useSelector((state: any) => state.profileReducer.avatar)
    const btc = useSelector((state: any) => state.balanceReducer.balanceBtc)
    const usd = useSelector((state: any) => state.balanceReducer.balanceUsd)
    const currency = useSelector((state: any) => state.balanceReducer.currency)

    const defaultFormState = {
        passwordData: {
            oldPassword: '',
            password: '',
            confirmPassword: ''
        },
        mainData: {
            email: '',
            nickname: '',
            phone: ''
        },
        enable2Fa: false
    }

    const [formState, setFormState] = useState<any>(defaultFormState)
    const [formErrors, setFormErrors] = useState<any>({})
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (profileInfo) {
            setFormState((prev: any) => {
                return {
                    ...prev,
                    mainData: profileInfo
                }
            })
        }
    }, [profileInfo])

    const fetchData = async () => {
        setLoader(true)

        await dispatch(getProfileInfo(token))
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
                        passwordData: {
                            ...prev.passwordData,
                            oldPassword: value
                        }
                    }
                })
                break;
            case 'password':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        passwordData: {
                            ...prev.passwordData,
                            password: value
                        }
                    }
                })
                break;
            case 'confirm-password':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        passwordData: {
                            ...prev.passwordData,
                            confirmPassword: value
                        }
                    }
                })
                break;
            case 'email':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        mainData: {
                            ...prev.mainData,
                            email: value
                        }
                    }
                })
                break;
            case 'nickname':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        mainData: {
                            ...prev.mainData,
                            nickname: value
                        }
                    }
                })
                break;
            case 'phone':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        mainData: {
                            ...prev.mainData,
                            phone: value
                        }
                    }
                })
                break;
            case '2fa':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        enable2Fa: value
                    }
                })
                break;
        }
    }

    const handleSubmit = async (type: string) => {
        setLoader(true)

        if (type === 'password') {
            await dispatch(changePassword(token, {...formState.passwordData, email: profileInfo.email}))

            //TODO - message of success password change
        }

        if (type === 'main') {

            if (profileInfo.email !== formState.mainData.email) {
                await dispatch(changeEmail(token, formState.mainData.email))
            }

            if (profileInfo.nickname !== formState.mainData.nickname) {
                await dispatch(changeNickname(token, {nickname: formState.mainData.nickname, hide: nicknameVisibility}))
            }

            // if (profileInfo.phone !== formState.mainData.phone) {
            //     await dispatch(changeEmail(token, formState.mainData.phone))
            // }

            await dispatch(getProfileInfo(token))

        }

        setLoader(false)
    }

    const changeNicknameVisibility = async (hide: boolean) => {
        setLoader(true)

        await dispatch(changeNickname(token, {nickname: formState.mainData.nickname, hide}))
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
                                {profileInfo.nickname}
                            </div>
                            <div className="user-card__info_balance">
                                {$t(`${currency === 'btc' ? btc || 0 : usd.toFixed(1) || 0} `)}
                                {getTicker(currency)}
                            </div>
                        </div>
                    </div>
                    <div className={'user-card__formRow'}>
                        <Input
                          title={'Change nickname'}
                          placeholder={'Nickname'}
                          type={'text'}
                          value={formState.mainData.nickname || ''}
                          onChange={(value) => formChangeHandler(value, 'nickname')}
                        />
                    </div>
                    <div className="user-card__nickname">
                        <Checkbox
                            checked={nicknameVisibility}
                            onChange={(value) => changeNicknameVisibility(value)}
                        >
                            {$t('Hide my nickname')}
                        </Checkbox>
                    </div>
                    <Button primary onClick={() => handleSubmit('main')}>
                        {$t('Save')}
                    </Button>
                </div>
            </Card>
            <Card title={'Main'}>
                <div className={'input-group'}>
                    <Input
                        title={'Email'}
                        placeholder={'Email'}
                        type={'text'}
                        value={formState.mainData.email || ''}
                        onChange={(value) => formChangeHandler(value, 'email')}
                    />
                    <Input
                        title={'Nickname'}
                        placeholder={'Nickname'}
                        type={'text'}
                        value={formState.mainData.nickname || ''}
                        onChange={(value) => formChangeHandler(value, 'nickname')}
                    />
                    <Input
                        title={'Phone'}
                        placeholder={'Phone'}
                        type={'text'}
                        value={formState.mainData.phone || ''}
                        onChange={(value) => formChangeHandler(value, 'phone')}
                    />
                </div>

                <div className={'user-card__fa2'}>
                    <Switcher
                        className={'fa2-switcher'}
                        title={'Enable 2FA'}
                        checked={formState.enable2Fa}
                        onChange={(value) => formChangeHandler(value, '2fa')}
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
                        value={formState.passwordData.oldPassword}
                        onChange={(value) => formChangeHandler(value, 'old-password')}
                    />
                    <Input
                        title={'New password'}
                        placeholder={'New password'}
                        type={'password'}
                        value={formState.passwordData.password}
                        onChange={(value) => formChangeHandler(value, 'password')}
                    />
                    <Input
                        title={'Confirm password'}
                        placeholder={'Confirm password'}
                        type={'password'}
                        value={formState.passwordData.confirmPassword}
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