import React, {useContext, useEffect, useState} from 'react';
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
import {CSSTransition} from "react-transition-group";
import {Spinner} from "../../../../components/Spinner/Spinner";
import {errorModalService} from "../../../../services/modal/errorModalService";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getUserCountry} from "../../../../store/actions/Application/applicationActions";
import {Switcher} from "../../../../components/Switcher/Switcher";

export const SignIn = () => {

  const defaultFormState = {
    email: '',
    phone: '',
    password: '',
    enable2Fa: false,
    googleAuthenticatorCode: ''
  }

  const [formState, setFormState] = useState<any>(defaultFormState)
  const [errors, setErrors] = useState<any>({})
  const [signType, setSignType] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)

  const history = useHistory()
  const dispatch = useDispatch()
  const {login} = useContext(AuthContext)
  const {t} = useTranslation()

  const country = useSelector((state: any) => state.applicationReducer.country)

  const fetchData = async () => {
    await dispatch(getUserCountry())
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleStateUpdate = (value: string, iterator: string) => {
    switch (iterator) {
      case 'email':
        setFormState((prev: any) => {
          return {
            ...prev,
            email: value
          }
        })
        break;
      case 'phone':
        setFormState((prev: any) => {
          return {
            ...prev,
            phone: value
          }
        })
        break;
      case 'password':
        setFormState((prev: any) => {
          return {
            ...prev,
            password: value
          }
        })
        break;
      case 'googleAuthenticatorCode':
        setFormState((prev: any) => {
          return {
            ...prev,
            googleAuthenticatorCode: value
          }
        })
        break;
    }
  }

  const handleSubmit = async () => {
    setLoader(true)

    if (!signType) {
      delete
          //@ts-ignore
          formState.phone
    } else {
      delete
          //@ts-ignore
          formState.email
    }

    const {errors} = inputValidator(formState)

    if (!Object.keys(errors).length) {
      try {
        const response = await axiosClient.post('/Auth/Login', formState)

        const data = response.data.payload;

        if (response.data.payload.jwtToken) {
          login(
              data.jwtToken,
              data.refreshToken,
              data.userId,
              data.nickname
          )
          
          history.push('/')
        } else {
          setErrors({login: 'Authorization failed'})
        }
      } catch (e:any) {

        if (e.response.data.errors[0] === 'Requires Two Factor') {
          setFormState((prev: any) => {
            return {
              ...prev,
              enable2Fa: true
            }
          })

          setLoader(false)
        } else {
          console.log(e)
          setErrors({login: 'Authorization failed'})
          errorModalService('Login error', e?.response?.status || null)
        }
      }
    } else {
      setErrors(errors)
    }

    setLoader(false)
  }

  console.log(formState)

  return (
      <div className={'auth-page'}>

        <CSSTransition in={loader} timeout={500} unmountOnExit classNames="my-node">
          <Spinner />
        </CSSTransition>

        <Card className={'fit-card'}>
          <div className="auth-page__signin">
            <div className="auth-page__title">
              {t('Sign In')}
            </div>
            <div className="form-group">
              {!signType ?
                  <Input
                      className={errors?.email ? 'input-error' : ''}
                      placeholder={'Email'}
                      type={'text'}
                      value={formState.email}
                      errors={errors?.email}
                      onChange={(value) => handleStateUpdate(value, 'email')}
                  /> :
                  <Input
                      className={errors?.phone ? 'input-error' : ''}
                      placeholder={'Phone'}
                      type={'phone'}
                      country={country.toUpperCase()}
                      value={formState.phone}
                      errors={errors?.phone}
                      onChange={(value) => handleStateUpdate(value, 'phone')}
                  />
              }
              <Switcher
                  checked={signType}
                  onChange={() => setSignType(!signType)}
                  title={'Sign in with phone'}
              />
              <Input
                  className={errors?.password ? 'input-error' : ''}
                  placeholder={'Password'}
                  type={'password'}
                  value={formState.password}
                  errors={errors?.password}
                  onChange={(value) => handleStateUpdate(value, 'password')}
              />

              {formState.enable2Fa ?
                  <Input
                      placeholder={'2FA code'}
                      type={'text'}
                      value={formState.googleAuthenticatorCode}
                      onChange={(value) => handleStateUpdate(value, 'googleAuthenticatorCode')}
                  /> : null
              }

              {errors.length ?
                  <div className={'errors-shower'}>
                    {t(errors?.login)}
                  </div> : null
              }

              <div className="auth-page__additional">
                {t('Forgot your password?')}
              </div>

              <div className="auth-page__buttons">
                <Button primary onClick={handleSubmit}>
                  {t('Log In')}
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