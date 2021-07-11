import React, {useContext, useEffect} from 'react';
import {Card} from "../../../../components/Card/Card";
import {Table} from "../../../../components/Table/Table";
import {AuthContext} from "../../../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import dateformat from "dateformat";
import {$t} from "../../../../lib/i18n";
import {getHiloHistory} from "../../../../store/actions/Hilo/hiloActions";

export const HiloResults = () => {

    const {token} = useContext(AuthContext)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHiloHistory(token, {pageSize: 100000, pageNumber: 0}))
    }, [])

    const data = useSelector((state: any) => state.hiloReducer.history).map((item: any) => {
        return {
            name: item.userName,
            game: item.gameNumber,
            bet: `${parseFloat(item.bet.toFixed(8))} BTC`,
            roll: item.rollType,
            generated: item.hiddenNumber,
            result: item.userWin,
            profit: `${parseFloat(item.gain.toFixed(8))} BTC`,
            date: dateformat(new Date(item.playDate).toString(), "d.mm.yyyy, hh:MM"),
            hash: item.hash,
        }
    })

    const columns = [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Game',
            accessor: 'game'
        },
        {
            Header: 'Bet',
            accessor: 'bet'
        },
        {
            Header: 'Roll',
            accessor: 'roll',
            Cell: ({row: {original}}: any) => (
                <div>
                    {$t(original.roll === 'MoreThan52' ? 'More than 52' : 'Less than 48')}
                </div>
            )
        },
        {
            Header: 'Generated number',
            accessor: 'generated'
        },
        {
            Header: 'Result',
            accessor: 'result',
            Cell: ({row: {original}}: any) => (
                <div className={original.result ? 'success' : 'danger'}>
                    {$t(original.result ? 'Win' : 'Lose')}
                </div>
            )
        },
        {
            Header: 'Profit',
            accessor: 'profit'
        },
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Hash',
            accessor: 'hash',
            Cell: ({row: {original}}: any) => (
                <div className={'table-hidden'}>
                    {$t(`${original.hash.slice(0, 10)}...`)}

                    <span className={'table-hidden__full'}>
                        {$t(original.hash)}
                    </span>
                </div>
            )
        },
    ]

    return (
        <Card className={'history-card'} title={'Games History'}>
            <Table
                data={data}
                columns={columns}
            />
        </Card>
    )
}