import React, {useContext, useState} from 'react';
import './WalletItem.scss';

import {ReactComponent as BTCIcon} from "./img/btc-ico-orange.svg";
import {ReactComponent as ETHIcon} from "./img/eth.svg";
import {ReactComponent as TrashIcon} from "./img/wallet-del.svg";
import {ReactComponent as SettingsIcon} from "./img/wallet-set.svg";
import { $t } from '../../../../../lib/i18n';
import {Button} from "../../../../../components/Button/Button";
import {useDispatch} from "react-redux";
import {deleteWallet} from "../../../../../store/actions/Balance/balanceActions";
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../../../../components/Spinner/Spinner";
import {AuthContext} from "../../../../../context/AuthContext";

interface WalletItemProps {
  data: any,
  onDeleteHandler: () => void;
}

export const WalletItem = ({
  data,
  onDeleteHandler,
}: WalletItemProps) => {

  const [loader, setLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

  const {token} = useContext(AuthContext)

  const removeHandler = async () => {
    setLoader(true)

    try {
      await dispatch(deleteWallet(token, data.address))

      onDeleteHandler()
    } catch (e) {
      console.log(e)
    }

    setLoader(false)
  }

  return (
    <div className={'wallet-item'}>

      <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
        <Spinner />
      </CSSTransition>

      <div className="wallet-item__content">
        {data.currency === 'BTC' ?
          <div className="wallet-item__content_icon btc">
            <BTCIcon />
          </div> : null
        }

        {data.currency === 'ETH' ?
          <div className="wallet-item__content_icon eth">
            <ETHIcon />
          </div> : null
        }
        <div className="wallet-item__content_data">
          <div className="wallet-item__content_data-name">
            {$t(data.address)}
          </div>
          <div className="wallet-item__content_data-balance text-secondary">
            {$t(`${data.balance} ${data.currency}`)}
          </div>
        </div>
      </div>
      <div className="wallet-item__buttons">
        <Button dark>
          <SettingsIcon />
        </Button>
        <Button dark onClick={removeHandler}>
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}