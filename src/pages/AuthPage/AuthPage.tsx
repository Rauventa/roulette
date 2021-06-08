import React, {useState} from 'react';
import { $t } from '../../lib/i18n';
import './AuthPage.scss'
import { SignIn } from './components/SignIn/SignIn';
import {SignUp} from "./components/SignUp/SignUp";

export const AuthPage = () => {

  const [page, setPage] = useState<boolean>(true);

  return (
    <div className={'auth-page'}>
      {page ? <SignIn /> : <SignUp /> }

      <div className={'auth-page__another'} onClick={() => setPage(!page)}>
        {page ?
          $t('Or Sign Up') :
          $t('Or Sign In')
        }
      </div>
    </div>
  )
}