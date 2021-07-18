import React, {useContext, useEffect, useState} from 'react';
import {Card} from "../../components/Card/Card";
import {Table} from "../../components/Table/Table";
import {AuthContext} from "../../context/AuthContext";
import {useDispatch, useSelector} from "react-redux";
import dateformat from "dateformat";
import {$t} from "../../lib/i18n";
import {getHiloHistory} from "../../store/actions/Hilo/hiloActions";
import DefaultIcon from "../DiceResults/img/default.png";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../components/Spinner/Spinner";
import {Button} from "../../components/Button/Button";
import {IResult} from "../../interfaces/results/IResult";

export const HiloResults = ({
  type
}: IResult) => {

    const {token} = useContext(AuthContext)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHiloHistory(token, {pageSize: 100000, pageNumber: 0, onlyMe: false}))
    }, [])

    const currency = useSelector((state: any) => state.balanceReducer.currency)
    const rate = useSelector((state: any) => state.balanceReducer.rate)

    const [historyType, setHistoryType] = useState<string>('all')
    const [loader, setLoader] = useState<boolean>(false)

    const data = useSelector((state: any) => state.hiloReducer.history).map((item: any) => {
        return {
            name: item.userName,
            icon: item.userAvatarUrl,
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

    const changeHistoryType = async (type: string) => {

        setLoader(true)

        setHistoryType(type)

        try {
            if (type === 'all') {
                await dispatch(getHiloHistory(token, {pageSize: 100000, pageNumber: 0, onlyMe: false}))
            }

            if (type === 'me') {
                await dispatch(getHiloHistory(token, {pageSize: 100000, pageNumber: 0, onlyMe: true}))
            }
        } catch (e) {
            console.log(e)
        }

        setLoader(false)
    }

    //TODO - add $ currency into the table

    const columns = [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({row: {original}}: any) => (
              <div className={'table-user'}>
                  <div className={'table-user__icon'}>
                      {original.icon ?
                        <img src={original.icon} alt="user icon"/> :
                        <img src={DefaultIcon} alt="user icon"/>
                      }
                  </div>
                  <div className="table-user__name">
                      {$t(original.name)}
                  </div>
              </div>
            )
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

            <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
                <Spinner />
            </CSSTransition>

            {type === 'all' ?
              <div className="history-card__extra">
                  <Button dark className={historyType === 'me' ? 'default' : ''} onClick={() => changeHistoryType('all')}>
                      {$t('All players')}
                  </Button>
                  <Button dark className={historyType === 'all' ? 'default' : ''} onClick={() => changeHistoryType('me')}>
                      {$t('Only me')}
                  </Button>
              </div> : null
            }

            <Table
                data={data}
                columns={columns}
            />
        </Card>
    )
}