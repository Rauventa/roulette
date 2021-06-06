import React, {useState} from 'react';
import './AuthPage.scss'
import {Input} from "../../components/Input/Input";
import { $t } from '../../lib/i18n';
import { Card } from '../../components/Card/Card';
import {Button} from "../../components/Button/Button";
import {ReactComponent as InstagramIcon} from "./img/igram.svg";
import {ReactComponent as VkIcon} from "./img/vk.svg";
import {ReactComponent as FacebookIcon} from "./img/fbook.svg";

export const AuthPage = () => {

  const defaultLoginFormState = {
    email: '',
    password: ''
  }

  const defaultRegFormState = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [page, setPage] = useState<boolean>(true);

  const [regFormState, setRegFormState] = useState(defaultRegFormState)
  const [loginFormState, setLoginFormState] = useState(defaultLoginFormState)

  const changeLoginState = (value: string, iterator: string) => {
    switch (iterator) {
      case 'email':
        setLoginFormState(prev => {
          return {
            ...prev,
            email: value
          }
        })
        break;
      case 'password':
        setLoginFormState(prev => {
          return {
            ...prev,
            password: value
          }
        })
        break;
    }
  }

  console.log(loginFormState)

  return (
    <div className={'auth-page'}>

      {page ?
        <Card className={'fit-card'}>
          <div className="auth-page__signin">
            <div className="auth-page__title">
              {$t('Sign In')}
            </div>
            <div className="input-group">
              <Input
                placeholder={$t('Email or Phone')}
                type={'text'}
                value={loginFormState.email}
                onChange={(value) => changeLoginState(value, 'email')}
              />
              <Input
                placeholder={$t('Password')}
                type={'password'}
                value={loginFormState.password}
                onChange={(value) => changeLoginState(value, 'password')}
              />

              <div className="auth-page__additional">
                {$t('Forgot your password?')}
              </div>

              <div className="auth-page__buttons">
                <Button primary>
                  {$t('Log In')}
                </Button>
                <div className="auth-page__buttons_socials">
                  <div className="auth-page__buttons_socials-item">
                    <InstagramIcon />
                  </div>
                  <div className="auth-page__buttons_socials-item">
                    <FacebookIcon />
                  </div>
                  <div className="auth-page__buttons_socials-item">
                    <VkIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
         :
        <Card className={'fit-card'}>
          <div className="auth-page__signup">
            <div className="auth-page__title">
              {$t('Sign Up')}
            </div>

            <Input placeholder={'hello'} type={'text'} value={''} onChange={() => console.log('hello')} />
          </div>
        </Card>
      }
    </div>
  )
}