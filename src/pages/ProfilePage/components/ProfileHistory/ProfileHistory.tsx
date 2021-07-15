import React, {useContext, useEffect, useState} from 'react';
import {Select} from "../../../../components/Select/Select";
import {getDiceHistory} from "../../../../store/actions/Dice/diceActions";
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../../context/AuthContext";
import {getHiloHistory} from "../../../../store/actions/Hilo/hiloActions";
import {Table} from "../../../../components/Table/Table";
import {$t} from "../../../../lib/i18n";
import dateformat from "dateformat";

export const ProfileHistory = () => {

    const dispatch = useDispatch()

    const {token} = useContext(AuthContext)

    const initialHistoryTypes = [
        {
            label: 'Dice',
            value: 'dice'
        },
        {
            label: 'HiLo',
            value: 'hilo'
        }
    ]

    const defaultHistoryParams = {
        pageSize: 10000,
        pageNumber: 0,
        onlyMe: true
    }

    const [type, setType] = useState<any>(initialHistoryTypes[0])

    useEffect(() => {

        //TODO - check is ok render initial table??
        changeHistoryType(type)
    }, [])

    const changeHistoryType = async (data: any) => {
        setType(data)

        if (data.value === 'dice') {
            await dispatch(getDiceHistory(token, defaultHistoryParams))
        }

        if (data.value === 'hilo') {
            await dispatch(getHiloHistory(token, defaultHistoryParams))
        }
    }

    // let data = []

    // if (type.value === 'dice') {
    //     data = useSelector((state: any) => state.diceReducer.history).map((item: any) => {
    //         return {
    //             name: item.userName,
    //             icon: item.userAvatarUrl,
    //             game: item.gameNumber,
    //             bet: `${parseFloat(item.bet.toFixed(8))} BTC`,
    //             chance: `${item.chance}%`,
    //             own: item.chance + 1,
    //             generated: item.hiddenNumber,
    //             result: item.userWin,
    //             profit: `${parseFloat(item.gain.toFixed(8))} BTC`,
    //             date: dateformat(new Date(item.playDate).toString(), "d.mm.yyyy, hh:MM"),
    //             hash: item.hash,
    //         }
    //     })
    // }
    //
    // if (type.value === 'hilo') {
    //     data = useSelector((state: any) => state.hiloReducer.history).map((item: any) => {
    //         return {
    //             name: item.userName,
    //             icon: item.userAvatarUrl,
    //             game: item.gameNumber,
    //             bet: `${parseFloat(item.bet.toFixed(8))} BTC`,
    //             roll: item.rollType,
    //             generated: item.hiddenNumber,
    //             result: item.userWin,
    //             profit: `${parseFloat(item.gain.toFixed(8))} BTC`,
    //             date: dateformat(new Date(item.playDate).toString(), "d.mm.yyyy, hh:MM"),
    //             hash: item.hash,
    //         }
    //     })
    // }

    const columns = [
        {
            Header: 'Game',
            accessor: 'game'
        },
        {
            Header: 'Bet',
            accessor: 'bet'
        },
        //
        //
        // type.value === 'dice' ?
        //     {
        //         Header: 'Chance',
        //         accessor: 'chance'
        //     } : null,
        //
        //
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
        }
    ]

    return (
        <>
            <Select
                options={initialHistoryTypes}
                value={type}
                onChange={(value) => changeHistoryType(value)}
            />

            {/*<Table*/}
            {/*    data={data}*/}
            {/*    columns={columns}*/}
            {/*/>*/}
        </>
    )
}