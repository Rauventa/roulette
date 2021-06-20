import React, {useContext, useState} from 'react';
import {$t} from "../../../../lib/i18n";
import {Input} from "../../../../components/Input/Input";
import {Button} from "../../../../components/Button/Button";
import {ReactComponent as InstagramIcon} from "../../img/igram.svg";
import {ReactComponent as FacebookIcon} from "../../img/fbook.svg";
import {ReactComponent as VkIcon} from "../../img/vk.svg";
import {Card} from "../../../../components/Card/Card";
import {axiosClient} from "../../../../utils/axiosClient";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";
import {inputValidator} from "../../../../lib/validator";
import '../../AuthPage.scss'

export const SignIn = () => {

  const defaultFormState = {
    email: '',
    password: ''
  }

  const [formState, setFormState] = useState(defaultFormState)
  const [errors, setErrors] = useState<any>({})

  const history = useHistory()
  const {login} = useContext(AuthContext)

  const handleStateUpdate = (value: string, iterator: string) => {
    switch (iterator) {
      case 'email':
        setFormState(prev => {
          return {
            ...prev,
            email: value
          }
        })
        break;
      case 'password':
        setFormState(prev => {
          return {
            ...prev,
            password: value
          }
        })
        break;
    }
  }


  const handleSubmit = async () => {

    const {errors} = inputValidator(formState)

    if (!Object.keys(errors).length) {
      try {
        const response = await axiosClient.post('/Auth/Login', formState)

        if (response.data.payload.jwtToken) {
          login(
              response.data.payload.jwtToken,
              response.data.payload.refreshToken,
              response.data.payload.userId,
              response.data.payload.nickname
          )
          history.push('/dice')
        } else {
          setErrors({login: 'Authorization failed'})
        }

      } catch (e) {
        setErrors({login: 'Authorization failed'})
      }
    } else {
      setErrors(errors)
    }
  }

  return (
      <div className={'auth-page'}>
        <Card className={'fit-card'}>
          <div className="auth-page__signin">
            <div className="auth-page__title">
              {$t('Sign In')}
            </div>
            <div className="input-group">
              <Input
                  className={errors?.email ? 'input-error' : ''}
                  placeholder={'Email or Phone'}
                  type={'text'}
                  value={formState.email}
                  errors={errors?.email}
                  onChange={(value) => handleStateUpdate(value, 'email')}
              />
              <Input
                  className={errors?.password ? 'input-error' : ''}
                  placeholder={'Password'}
                  type={'password'}
                  value={formState.password}
                  errors={errors?.password}
                  onChange={(value) => handleStateUpdate(value, 'password')}
              />

              <div className={'errors-shower'}>
                {$t(errors?.login)}
              </div>

              <div className="auth-page__additional">
                {$t('Forgot your password?')}
              </div>

              <div className="auth-page__buttons">
                <Button primary onClick={handleSubmit}>
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
      </div>
  )
}