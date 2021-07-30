import React, {useContext, useEffect, useState} from 'react';
import './ProfileReferral.scss';
import {useDispatch, useSelector} from "react-redux";
import {getReferralLink, getReferrals, getReferralsStatistic} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";
import {Card} from "../../../../components/Card/Card";
import {Input} from "../../../../components/Input/Input";
import { $t } from '../../../../lib/i18n';
import {Table} from "../../../../components/Table/Table";
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import {getTicker} from "../../../../lib/tickers";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {config} from "../../../../config/config";
import DefaultIcon from "../../../../containers/DiceResults/img/default.png";
import dateformat from "dateformat";

export const ProfileReferral = () => {

    const dispatch = useDispatch()

    const {token, userId} = useContext(AuthContext)

    const currency = useSelector((state: any) => state.balanceReducer.currency)
    const rate = useSelector((state: any) => state.balanceReducer.rate)
    const link = useSelector((state: any) => state.profileReducer.referralLink)
    const referralsCount = useSelector((state: any) => state.profileReducer.referralsCount)
    const referrals = useSelector((state: any) => state.profileReducer.referrals).map((item: any, index: number) => {
        return {
            id: index+1,
            icon: item.avatarUrl,
            name: item.referalName
        }
    })
    const referralStats = useSelector((state: any) => state.profileReducer.referralStats).map((item: any, index: number) => {
        return {
            ...item,
            icon: item.avatarUrl,
            name: item.referalName
        }
    })

    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
      fetchData()
    }, []);

    const fetchData = async () => {
      setLoader(true)

      await dispatch(getReferrals(token))
      await dispatch(getReferralsStatistic(token, userId))
      await dispatch(getReferralLink(token))

      setLoader(false)
    }

    const referralsColumns = [
        {
            Header: '#',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({row: {original}}: any) => (
                <div className={'table-user'}>
                    <div className={'table-user__icon'}>
                        {original.icon ?
                            <img src={`${config.apiPhotoPrefixUrl}/${original.icon}`} alt="user icon"/> :
                            <img src={DefaultIcon} alt="user icon"/>
                        }
                    </div>
                    {original.name === '[Hidden]' ?
                        <div className="table-user__name hidden-nickname">
                            {$t('Hidden')}
                        </div> :
                        <div className="table-user__name">
                            {$t(original.name)}
                        </div>
                    }
                </div>
            )
        },
    ]

    const referralStatsColumns = [
        {
            Header: 'Name',
            accessor: 'referalName',
            Cell: ({row: {original}}: any) => (
                <div className={'table-user'}>
                    <div className={'table-user__icon'}>
                        {original.icon ?
                            <img src={`${config.apiPhotoPrefixUrl}/${original.icon}`} alt="user icon"/> :
                            <img src={DefaultIcon} alt="user icon"/>
                        }
                    </div>
                    {original.name === '[Hidden]' ?
                        <div className="table-user__name hidden-nickname">
                            {$t('Hidden')}
                        </div> :
                        <div className="table-user__name">
                            {$t(original.name)}
                        </div>
                    }
                </div>
            )
        },
        {
            Header: 'Game',
            accessor: 'game',
        },
        {
            Header: 'Date',
            accessor: 'playDate',
            Cell: ({row: {original}}: any) => (
                <div>
                    {dateformat(new Date(original.playDate).toString(), "d.mm.yyyy, hh:MM")}
                </div>
            )
        },
        {
            Header: 'Reward',
            accessor: 'reward',
            Cell: ({row: {original}} : any) => (
                <div className={'success'}>
                    {$t(`+ ${currencyValueChanger(currency, rate, original.reward)} ${getTicker(currency)}`)}
                </div>
            )
        },
    ]

    return (
        <div className={'profile-referral'}>

            <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
                <Spinner />
            </CSSTransition>

            <div className="profile-referral__info">
                <Card title={`Your Referral Link`} className={'referral-link-card'}>
                    <div className={'referral-link-card__text text-secondary'}>
                        {$t(' Register a player using your link and get 5% from each win for life')}
                    </div>
                    <Input
                        title={'Referral link'}
                        placeholder={'hello'}
                        type={'text'}
                        value={`${config.referralPrefix}${link}`}
                    />
                </Card>
                <Card title={`Referrals ${referralsCount}`}>
                    <Table
                        data={referrals}
                        columns={referralsColumns}
                    />
                </Card>
            </div>
            <div className="profile-referral__statistic">
                <Card title={'Referrals statistic'}>
                    <Table
                        data={referralStats}
                        columns={referralStatsColumns}
                    />
                </Card>
            </div>
        </div>
    )
}