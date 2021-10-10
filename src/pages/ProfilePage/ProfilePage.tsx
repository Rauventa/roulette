import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.scss'
import {ProfileSettings} from "./components/ProfileSettings/ProfileSettings";
import {ProfileHistory} from "./components/ProfileHistory/ProfileHistory";
import {ProfileDeposit} from "./components/ProfileDeposit/ProfileDeposit";
import {ProfileReferral} from "./components/ProfileReferral/ProfileReferral";
import {UserWallets} from "./components/UserWallets/UserWallets";
import {UserStats} from "../../containers/UserStats/UserStats";
import {WithdrawPage} from "../WithdrawPage/WithdrawPage";
import {useTranslation} from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog, faHistory, faMoneyBill, faMoneyCheckAlt, faUsers, faWallet, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {ProfileMessages} from "./components/ProfileMessages/ProfileMessages";
import { Button } from '../../components/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../context/AuthContext";
import {changeEmail, changePhone, confirmEmail, confirmPhone, getProfileInfo} from "../../store/actions/Profile/profileActions";
import {Input} from "../../components/Input/Input";
import {loaderVisibilityHandler} from "../../store/actions/Application/applicationActions";

export const ProfilePage = () => {

    const {t} = useTranslation()
    const {token} = useContext(AuthContext)
    const dispatch = useDispatch()

    const profileInfo = useSelector((state: any) => state.profileReducer.profileInfo)

    const defaultFormState = {
        isSuccess: false,
        code: ''
    }

    const [formState, setFormState] = useState<any>(defaultFormState)
    const [page, setPage] = useState<string>('settings')

    const fetchData = async () => {
        await dispatch(getProfileInfo(token))
    }

    const changeTabHandler = (iterator: string) => {
        setPage(iterator)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const tabs = [
        {
            title: 'Settings',
            iterator: 'settings',
            icon: faCog,
        },
        {
            title: 'My game history',
            iterator: 'history',
            icon: faHistory,
        },
        {
            title: 'Deposit',
            iterator: 'deposit',
            icon: faMoneyBill,
        },
        {
            title: 'Withdraw',
            iterator: 'withdraw',
            icon: faMoneyCheckAlt,
        },
        {
            title: 'Wallets',
            iterator: 'wallets',
            icon: faWallet,
        },
        {
            title: 'Referral',
            iterator: 'referral',
            icon: faUsers,
        },
        {
            title: 'Messages',
            iterator: 'messages',
            icon: faEnvelope,
        },
    ]

    const confirmProfile = async (type: string) => {
        dispatch(loaderVisibilityHandler(true))

        if (type === 'email') {
            const response: any = await dispatch(changeEmail(token, {email: profileInfo.email}))

            setFormState((prev: any) => {
                return {
                    ...prev,
                    isSuccess: response
                }
            })
        } else {
            const response: any = await dispatch(changePhone(token, {phone: profileInfo.phone}))

            setFormState((prev: any) => {
                return {
                    ...prev,
                    isSuccess: response
                }
            })
        }

        dispatch(loaderVisibilityHandler(false))
    }

    const formChangeHandler = (value: any, type: string) => {
        switch (type) {
            case 'code':
                setFormState((prev: any) => {
                    return {
                        ...prev,
                        code: value
                    }
                })
                break;
        }
    }

    const sendConfirmProfile = async (type: string) => {
        dispatch(loaderVisibilityHandler(true))

        if (type === 'email') {
            dispatch(confirmEmail(token, {email: profileInfo.email, code: formState.code}, 'confirm'))
        } else {
            dispatch(confirmPhone(token, {phone: profileInfo.phone, code: formState.code}, 'confirm'))
        }

        await dispatch(getProfileInfo(token))
        setFormState(defaultFormState)

        dispatch(loaderVisibilityHandler(false))
    }

  return (
    <div className={'profile'}>

        <div className="profile__stats">
            <UserStats />
        </div>

        <div className="profile__header">
            <div className="profile__header_tabs">
                {tabs.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className={`profile__header_tabs-tab ${item.iterator === page ? 'active' : ''}`}
                            onClick={() => changeTabHandler(item.iterator)}
                        >
                            {t(`${item.title}`)}
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                    )
                })}
            </div>
        </div>

        {profileInfo.needToConfirmEmail ?
            <div className="profile__confirm">
                <div className="profile__confirm_message">
                    {t('You have not confirmed your email')}
                </div>
                <div className="profile__confirm_form">
                    {formState.isSuccess ?
                        <Input
                            placeholder={'Code'}
                            type={'text'}
                            value={formState.code}
                            onChange={(value) => formChangeHandler(value, 'code')}
                        /> : null
                    }
                    {formState.isSuccess ?
                        <Button
                            light
                            onClick={() => sendConfirmProfile('email')}
                        >
                            {t('Confirm')}
                        </Button> :
                        <Button
                            light
                            onClick={() => confirmProfile('email')}
                        >
                            {t('Confirm')}
                        </Button>
                    }
                </div>
            </div> : null
        }

        {profileInfo.needToConfirmPhone ?
            <div className="profile__confirm">
                <div className="profile__confirm_message">
                    {t('You have not confirmed your phone')}
                </div>
                <div className="profile__confirm_form">
                    {formState.isSuccess ?
                        <Input
                            placeholder={'Code'}
                            type={'text'}
                            value={formState.code}
                            onChange={(value) => formChangeHandler(value, 'code')}
                        /> : null
                    }
                    {formState.isSuccess ?
                        <Button
                            light
                            onClick={() => sendConfirmProfile('phone')}
                        >
                            {t('Confirm')}
                        </Button> :
                        <Button
                            light
                            onClick={() => confirmProfile('phone')}
                        >
                            {t('Confirm')}
                        </Button>
                    }
                </div>
            </div> : null
        }

        <div className="profile__content">
            {page === 'settings' ?
                <ProfileSettings /> : null
            }

            {page === 'history' ?
                <ProfileHistory /> : null
            }

            {page === 'deposit' ?
                <ProfileDeposit /> : null
            }

            {page === 'withdraw' ?
                <WithdrawPage /> : null
            }

            {page === 'wallets' ?
                <UserWallets /> : null
            }

            {page === 'referral' ?
                <ProfileReferral /> : null
            }

            {page === 'messages' ?
              <ProfileMessages /> : null
            }
        </div>
    </div>
  )
}