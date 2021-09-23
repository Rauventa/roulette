import React, {useState} from 'react';
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
import {faCog, faHistory, faMoneyBill, faMoneyCheckAlt, faUsers, faWallet} from '@fortawesome/free-solid-svg-icons';

export const ProfilePage = () => {

  const {t} = useTranslation()

    const [page, setPage] = useState<string>('settings')

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
    ]

    const changeTabHandler = (iterator: string) => {
        setPage(iterator)
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
        </div>
    </div>
  )
}