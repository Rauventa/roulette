import React from 'react';
import { $t } from '../../lib/i18n';
import './Page404.scss';
import {Button} from "../../components/Button/Button";
import {useHistory} from "react-router-dom";

export const Page404 = () => {

  const history = useHistory()

  return (
    <div className={'page-404'}>
      <div className="page-404__title">
        {$t('404')}
      </div>
      <div className="page-404__subtitle">
        {$t('Page not found')}
      </div>
      <div className="page-404__button">
        <Button light onClick={() =>  history.goBack()}>
          {$t('Go back')}
        </Button>
      </div>
    </div>
  )
}