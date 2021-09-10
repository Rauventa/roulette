import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPaymentProof} from "../../store/actions/Balance/balanceActions";
import {config} from "../../config/config";
import {AuthContext} from "../../context/AuthContext";
import { Table } from '../../components/Table/Table';
import dateformat from "dateformat";
import DefaultIcon from "../../containers/DiceResults/img/default.png";
import {Card} from "../../components/Card/Card";
import {ReactComponent as DownArrowIcon} from "../../containers/DepositContainer/img/down-arrow.svg";
import {ReactComponent as UpArrowIcon} from "../../containers/DepositContainer/img/up-arrow.svg";

import {ReactComponent as CheckIcon} from "./img/check.svg";
import {ReactComponent as TimesIcon} from "./img/close.svg";
import {ReactComponent as TimerIcon} from "./img/chronometer.svg";
import {useTranslation} from "react-i18next";

export const PaymentProofPage = () => {

  const dispatch = useDispatch()

  const {token} = useContext(AuthContext)

  const {t} = useTranslation()

  const data = useSelector((state: any) => state.balanceReducer.proofData).map((item: any) => {
    return {
      ...item,
      name: item.userName,
      icon: item.userAvatarUrl,
      fee: item.feeAmount || 'No',
      date: dateformat(new Date(item.createdAt).toString(), "d.mm.yyyy hh:MM"),
    }
  })

  const fetchData = async () => {
    await dispatch(getPaymentProof(token, config.historyLoadParams))
  }

  useEffect(() => {
    fetchData()
  }, []);

  const columns = React.useMemo(
    () => [
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
                {t('Hidden')}
              </div> :
              <div className="table-user__name">
                {t(original.name)}
              </div>
            }
          </div>
        )
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'Amount',
        accessor: 'amount'
      },
      {
        Header: 'Currency',
        accessor: 'currency'
      },
      {
        Header: 'Fee',
        accessor: 'fee'
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({row: {original}}: any) =>
          original.type === 'deposit' ? (
            <div className={`table-icon-block success`}>
              <DownArrowIcon />
              {original.type}
            </div>
          ) : (
            <div className={`table-icon-block danger`}>
              <UpArrowIcon />
              {original.type}
            </div>
          )
      },
      {
        Header: 'Link',
        accessor: 'blockchainSearchLink',
        Cell: ({row: {original}} : any) => (
          <div>
            <a href={original.blockchainSearchLink} target={'_blank'} className={'default-link'}>
              {t('BlockChain Link')}
            </a>
          </div>
        )
      },
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({row: {original}} : any) => (
          <div className={'table-icons'}>
            {original.status.includes('confirmation') ?
              <CheckIcon /> : null
            }
          </div>
        )
      },
    ], []
  )

  return (
    <div className={'payment-proof'}>
      <div className="page-title">
        {t('Payment proof')}
      </div>

      <div className="payment-proof__content">
        <Card>
          <Table
            data={data}
            columns={columns}
          />
        </Card>
      </div>
    </div>
  )
}