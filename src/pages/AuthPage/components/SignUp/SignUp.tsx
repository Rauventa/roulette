import React, {useContext, useState} from 'react';
import {$t} from "../../../../lib/i18n";
import {Input} from "../../../../components/Input/Input";
import {Checkbox} from "../../../../components/Checkbox/Checkbox";
import {NavLink, useHistory} from "react-router-dom";
import {Button} from "../../../../components/Button/Button";
import {ReactComponent as InstagramIcon} from "../../img/igram.svg";
import {ReactComponent as FacebookIcon} from "../../img/fbook.svg";
import {ReactComponent as VkIcon} from "../../img/vk.svg";
import {Card} from "../../../../components/Card/Card";
import {axiosClient} from "../../../../utils/axiosClient";
import {inputValidator} from "../../../../lib/validator";
import {AuthContext} from "../../../../context/AuthContext";
import '../../AuthPage.scss'
import {useDispatch} from "react-redux";
import {errorModalService} from "../../../../services/modal/errorModalService";

export const SignUp = () => {

  const defaultFormState = {
    email: '',
    password: '',
    confirmPassword: '',
    license: true,
    registerWithBonus: false
  }

  const [formState, setFormState] = useState(defaultFormState)
  const [errors, setErrors] = useState<any>({})

  const history = useHistory()
  const {login} = useContext(AuthContext)

  const dispatch = useDispatch()

  const handleStateUpdate = (value: any, iterator: string) => {
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
      case 'repeat':
        setFormState(prev => {
          return {
            ...prev,
            confirmPassword: value
          }
        })
        break;
      case 'license':
        setFormState(prev => {
          return {
            ...prev,
            license: value
          }
        })
        break;
    }
  }

  const handleSubmit = async () => {

    const {errors} = inputValidator(formState)

    if (!Object.keys(errors).length) {
      try {
        const response = await axiosClient.post('/Auth/SignUp', formState)

        const data = response.data.payload;

        if (response.data.payload.jwtToken) {
          login(
              data.jwtToken,
              data.refreshToken,
              data.userId,
              data.nickname
          )
          history.push('/dice')
        } else {
          if (response.data.errors[0] === 'Email Already Taken Error') {
            setErrors({registration: 'This email is already taken'})
          } else {
            setErrors({registration: 'Registration failed,  password must have at least one non alphanumeric character, one lowercase (\'a\'-\'z\'), one uppercase (\'A\'-\'Z\')'})
          }
        }

      } catch (e) {
        setErrors({registration: 'Registration failed'})
        errorModalService('Registration error', e.response?.status || null)
      }
    } else {
      setErrors(errors)
    }
  }

  return (
      <div className={'auth-page'}>
        <Card className={'fit-card'}>
          <div className="auth-page__signup">
            <div className="auth-page__title">
              {$t('Sign Up')}
            </div>
            <div className="form-group">
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

              <Input
                  className={errors?.confirmPassword ? 'input-error' : ''}
                  placeholder={'Confirm Password'}
                  type={'password'}
                  value={formState.confirmPassword}
                  errors={errors?.confirmPassword}
                  onChange={(value) => handleStateUpdate(value, 'repeat')}
              />

              <Checkbox
                  checked={formState.license}
                  onChange={(value) => handleStateUpdate(value, 'license')}
              >
                <div>
                  {$t('I confirm that I agree to the')}
                  <NavLink to={'/'} className={'danger-link'}>
                    {$t('License agreement')}
                  </NavLink>
                </div>
              </Checkbox>

              {errors.length ?
                  <div className={'errors-shower'}>
                    {$t(errors?.registration)}
                  </div> : null
              }
              <div className="auth-page__buttons">
                <Button primary onClick={handleSubmit}>
                  {$t('Sign Up')}
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