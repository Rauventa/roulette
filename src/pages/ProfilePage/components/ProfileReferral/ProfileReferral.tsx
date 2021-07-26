import React, {useContext, useEffect, useState} from 'react';
import './ProfileReferral.scss';
import {useDispatch, useSelector} from "react-redux";
import {getReferrals, getReferralsStatistic} from "../../../../store/actions/Profile/profileActions";
import {AuthContext} from "../../../../context/AuthContext";
import {Card} from "../../../../components/Card/Card";
import {Input} from "../../../../components/Input/Input";
import { $t } from '../../../../lib/i18n';
import {Table} from "../../../../components/Table/Table";
import {currencyValueChanger} from "../../../../lib/numberRefractor";
import {getTicker} from "../../../../lib/tickers";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../../../components/Spinner/Spinner";

export const ProfileReferral = () => {

    const dispatch = useDispatch()

    const {token, userId} = useContext(AuthContext)

    const currency = useSelector((state: any) => state.balanceReducer.currency)
    const rate = useSelector((state: any) => state.balanceReducer.rate)

    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
      fetchData()
    }, []);

    const fetchData = async () => {
      setLoader(true)

      await dispatch(getReferrals(token))
      await dispatch(getReferralsStatistic(token, userId))

      setLoader(false)
    }

    const referrals = useSelector((state: any) => state.profileReducer.referrals).map((item: any, index: number) => {
        return {
            id: index + 1,
            name: item
        }
    })

    const referralStats = useSelector((state: any) => state.profileReducer.referralStats)

    const referralsColumns = [
        {
            Header: '#',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
    ]

    const referralStatsColumns = [
        {
            Header: 'Name',
            accessor: 'referalName',
        },
        {
            Header: 'Game',
            accessor: 'game',
        },
        {
            Header: 'Date',
            accessor: 'playDate',
        },
        {
            Header: 'Reward',
            accessor: 'reward',
            Cell: ({row: {original}} : any) => (
                <div>
                    {$t(`${currencyValueChanger(currency, rate, original.reward)} ${getTicker(currency)}`)}
                </div>
            )
        },
    ]

    return (
        <div className={'profile-referral'}>

            <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
                <Spinner />
            </CSSTransition>

            <div className="profile-referral__list">
                <Card title={'Referral'} className={'referral-link-card'}>
                    <div className={'referral-link-card__text text-secondary'}>
                        {$t(' Register a player using your link and get 5% from each win for life')}
                    </div>
                    <Input
                        title={'Referral link'}
                        placeholder={'hello'}
                        type={'text'}
                        value={'loremsfklsdjffoqkwopfkqpofmisdmmfuqf,poqiopqe.fpqwf'}
                    />
                </Card>
                <Card title={'Referrals'}>
                    <Table
                        data={referrals}
                        columns={referralsColumns}
                        noPagination
                    />
                </Card>
            </div>
            <div className="profile-referral__statistic">
                <Card title={'Referrals statistic'}>
                    <Table
                        data={referralStats}
                        columns={referralStatsColumns}
                        noPagination
                    />
                </Card>
            </div>
        </div>
    )
}