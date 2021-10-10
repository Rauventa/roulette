import React, {useContext, useEffect, useState} from 'react';
import'./ProfileSettings.scss';
import { Card } from '../../../../components/Card/Card';
import {Input} from "../../../../components/Input/Input";
import {FileInput} from "../../../../components/FileInput/FileInput";
import { Button } from '../../../../components/Button/Button';

import DefaultIcon from './img/default.png';

import {ReactComponent as PenIcon} from "./img/pen.svg";

import {useDispatch, useSelector} from "react-redux";
import {
    changeEmail,
    changeNickname, changePassword, changePhone, confirm2fa, confirmEmail, confirmPhone,
    getAvatar, getCurrent2fa,
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
import {useTranslation} from "react-i18next";
import {getBonusBalance} from "../../../../store/actions/Balance/balanceActions";
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import {getUserCountry} from "../../../../store/actions/Application/applicationActions";

export const ProfileSettings = () => {

    const dispatch = useDispatch()

    const {token} = useContext(AuthContext)

    const {t} = useTranslation()

    const nicknameVisibility = useSelector((state: any) => state.profileReducer.nicknameVisibility)
    const profileInfo = useSelector((state: any) => state.profileReducer.profileInfo)
    const avatar = useSelector((state: any) => state.profileReducer.avatar)
    const btc = useSelector((state: any) => state.balanceReducer.balanceBtc)
    const usd = useSelector((state: any) => state.balanceReducer.balanceUsd)
    const rate = useSelector((state: any) => state.balanceReducer.rate)
    const currency = useSelector((state: any) => state.balanceReducer.currency)
    const bonus = useSelector((state: any) => state.balanceReducer.bonusBalance)
    const country = useSelector((state: any) => state.applicationReducer.country)
    const faCode = useSelector((state: any) => state.profileReducer.faCode)

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
        fa2Code: '',
        emailCode: '',
        enableEmailCode: false,
        phoneCode: '',
        enablePhoneCode: false,
    }

    const [formState, setFormState] = useState<any>(defaultFormState)

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
        await dispatch(getProfileInfo(token))
        await dispatch(getNicknameVisibility(token))
        await dispatch(getAvatar(token))
        await dispatch(getBonusBalance(token))
        await dispatch(getUserCountry())
    }

    const formChangeHandler = async (value: any, iterator: string) => {
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
            case 'emailCode':
                if (value.length === 6) {
                    await dispatch(confirmEmail(token, {email: formState.mainData.email, code: value}, 'change'))
                }
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        emailCode: value
                    }
                })
                break;
            case 'changeEnableEmailCode':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        enableEmailCode: value
                    }
                })
                break;
            case 'changeEnablePhoneCode':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        enablePhoneCode: value
                    }
                })
                break;
            case 'phoneCode':
                if (value.length === 6) {
                    await dispatch(confirmPhone(token, {phone: formState.mainData.phone, code: value}, 'change'))
                }
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        phoneCode: value
                    }
                })
                break;
            case 'fa2Code':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        fa2Code: value
                    }
                })
                break;
        }
    }

    const handleSubmit = async (type: string) => {

        switch (type) {
            case 'password':
                await dispatch(changePassword(token, {...formState.passwordData, email: profileInfo.email}))
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        passwordData: defaultFormState.passwordData
                    }
                })
                break;
            case 'email':
                if (profileInfo.email !== formState.mainData.email) {
                    await dispatch(changeEmail(token, {email: formState.mainData.email}))
                    setFormState((prev: any) => {
                        return {
                            ...prev,
                            enableEmailCode: true
                        }
                    })
                }
                break;
            case 'phone':
                if (profileInfo.phone !== formState.mainData.phone) {
                    await dispatch(changePhone(token, {phone: formState.mainData.phone}))
                }
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        enablePhoneCode: true
                    }
                })
                break;
            case 'nickname':
                if (profileInfo.nickname !== formState.mainData.nickname) {
                    await dispatch(changeNickname(token, {nickname: formState.mainData.nickname, hide: nicknameVisibility}))
                }
                break;
        }
    }

    const changeNicknameVisibility = async (hide: boolean) => {
        await dispatch(changeNickname(token, {nickname: formState.mainData.nickname, hide}))
        await dispatch(getNicknameVisibility(token))
    }

    const savePicHandler = async (data: any) => {
        const formData = new FormData()
        formData.append('File', data)

        await dispatch(uploadAvatar(token, formData))
        await dispatch(getAvatar(token))
    }

    const get2FaCode = async () => {
        await dispatch(getCurrent2fa(token))
    }

    const confirm2FaAuth = async () => {
        await dispatch(confirm2fa(token, {enable: !profileInfo.is2FaEnabled, googleAuthenticatorCode: formState.fa2Code}))
        await dispatch(getProfileInfo(token))

        setFormState((prev: any) => {
            return {
                ...prev,
                fa2Code: ''
            }
        })
    }

    return (
        <>
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
                                {t(`${currency === 'btc' ? btc || 0 : usd.toFixed(1) || 0} `)}
                                {getTicker(currency)}
                            </div>

                            {bonus ?
                                <div className="user-card__info_bonus">
                                    Bonus: {currencyValueChanger(currency, rate, bonus)} {getTicker(currency)}
                                </div> : null
                            }
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
                            {t('Hide my nickname')}
                        </Checkbox>
                    </div>
                    <Button primary onClick={() => handleSubmit('nickname')}>
                        {t('Save')}
                    </Button>
                </div>
            </Card>
            <div className={'main'}>
                <Card>
                    <div className={'input-group'}>
                        <Input
                          title={'Email'}
                          placeholder={'Email'}
                          type={'text'}
                          value={formState.mainData.email || ''}
                          onChange={(value) => formChangeHandler(value, 'email')}
                        />
                    </div>
                    {formState.enableEmailCode ?
                        <div className={'input-group'}>
                            <Input
                                placeholder={'Code'}
                                type={'text'}
                                value={formState.emailCode}
                                onChange={(value) => formChangeHandler(value, 'emailCode')}
                            />
                        </div> : null
                    }
                    {(profileInfo.email !== formState.mainData.email) && !formState.enableEmailCode ?
                      <Button primary onClick={() => handleSubmit('email')}>
                          {t('Save')}
                      </Button> : null
                    }
                    {}
                </Card>
                <Card>
                    <div className={'input-group'}>
                        <Input
                          title={'Phone'}
                          placeholder={'Phone'}
                          type={'phone'}
                          country={country.toUpperCase()}
                          value={formState.mainData.phone || ''}
                          onChange={(value) => formChangeHandler(value, 'phone')}
                        />
                    </div>
                    {formState.enablePhoneCode ?
                        <div className={'input-group'}>
                            <Input
                                placeholder={'Code'}
                                type={'text'}
                                value={formState.phoneCode}
                                onChange={(value) => formChangeHandler(value, 'phoneCode')}
                            />
                        </div> : null
                    }
                    {(profileInfo.phone !== formState.mainData.phone) && !formState.enablePhoneCode ?
                      <Button primary onClick={() => handleSubmit('phone')}>
                          {t('Save')}
                      </Button> : null
                    }
                </Card>
                <Card>
                    <div className={'user-card__fa2'}>
                        <Switcher
                          className={'fa2-switcher'}
                          title={'Enable 2FA'}
                          checked={profileInfo.is2FaEnabled}
                          onChange={get2FaCode}
                        />
                        {faCode && !profileInfo.is2FaEnabled ?
                            <div className="user-card__fa2_code">
                                <img src={faCode.qrCodeSetupImageUrl} alt="qr-code"/>
                            </div> : null
                        }
                        {faCode ?
                            <div className="user-card__fa2_data">
                                <Input
                                    title={'Code'}
                                    placeholder={'123 123'}
                                    type={'text'}
                                    value={formState.fa2Code}
                                    onChange={(value) => formChangeHandler(value, 'fa2Code')}
                                />
                                <Button
                                    light
                                    onClick={confirm2FaAuth}
                                >
                                    {t('Confirm')}
                                </Button>
                            </div> : null
                        }
                    </div>
                </Card>
            </div>
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
                    {t('Save')}
                </Button>
            </Card>
        </>
    )
}