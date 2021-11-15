import React, {useContext, useEffect, useState} from 'react';
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
import {Select} from "../../../../components/Select/Select";
import '../../AuthPage.scss'
import {useTranslation} from "react-i18next";
import {Switcher} from "../../../../components/Switcher/Switcher";
import {useDispatch, useSelector} from "react-redux";
import {
  getUserCountry,
  loaderVisibilityHandler,
  getAvialableBonuses,
  updateInformer
} from "../../../../store/actions/Application/applicationActions";

export const SignUp = () => {

  const defaultFormState = {
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    license: true,
  }
  const defaultBonus = {
    id: 0,
    amount: 0,
    wager: 0
  }

  const [formState, setFormState] = useState(defaultFormState)
  const [signType, setSignType] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>({})
  const [bonus, setBonus] = useState(defaultBonus)

  const history = useHistory()
  const dispatch = useDispatch()
  const {login} = useContext(AuthContext)

  const {t} = useTranslation()

  const country = useSelector((state: any) => state.applicationReducer.country)
  const bonuses = useSelector((state: any) => state.applicationReducer.bonuses)

  const fetchData = async () => {
    await dispatch(getUserCountry());
    await dispatch(getAvialableBonuses());
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      case 'phone':
        setFormState(prev => {
          return {
            ...prev,
            phone: value
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
    dispatch(loaderVisibilityHandler(true))

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
        const response = await axiosClient.post(!signType ? '/Auth/SignUpByEmail' : '/Auth/SignUpByPhone', bonus?{...formState, bonus: bonus.id}:formState)

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
          if (response.data.errors[0] === 'Email Already Taken Error') {
            setErrors({registration: 'This email is already taken'})
          } else if (response.data.errors[0] === 'Phone Already Taken Error') {
            setErrors({registration: 'This phone is already taken'})
          } else {
            setErrors({registration: 'Registration failed,  password must have at least one non alphanumeric character, one lowercase (\'a\'-\'z\'), one uppercase (\'A\'-\'Z\')'})
          }
        }

      } catch (e:any) {
        setErrors({registration: 'Registration failed'})
        //@ts-ignore
        dispatch(updateInformer({message: e.response.data.errors[0], active: true, type: 'error', timeout: 5}))
      }
    } else {
      setErrors(errors)
    }

    dispatch(loaderVisibilityHandler(false))
  }

  const handleRadioChange = (bonus: any) => {
    if (bonus) {
      setFormState(prev => {
        return {
          ...prev,
          bonus: bonus.value
        }
      });
      setBonus(bonuses.filter((el:any) => el.id === bonus.value)[0])
      
      console.log('formState ', formState)
    } else {
      setFormState(prev => {
        return {
          ...prev,
          bonus: null
        }
      });
      setBonus(defaultBonus)
    }
  }

  return (
      <div className={'auth-page'}>
        <Card className={'fit-card'}>
          <div className="auth-page__signup">
            <div className="auth-page__title">
              {t('Sign Up')}
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
                  <>
                    <Input
                        className={errors?.phone ? 'input-error' : ''}
                        placeholder={'Phone'}
                        type={'phone'}
                        country={country.toUpperCase()}
                        value={formState.phone}
                        errors={errors?.phone}
                        onChange={(value) => handleStateUpdate(value, 'phone')}
                    />
                  </>
              }
              <Switcher
                  checked={signType}
                  onChange={() => setSignType(!signType)}
                  title={'Sign up with phone'}
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

            <Select
              className={'auth-page__bonus-select'}
              options={bonuses?.map((option:any)=>{
                return {
                    label:`${option.amount} BTC`,
                    value:option.id
                  }
              })}
              value={bonus.id!==0?{label:`${bonus.amount} BTC`, value: bonus.id}:null}
              onChange={handleRadioChange}
              placeholder={'Select Bonus'}
              isClearable={!!bonus||false}
            />

            {bonus?.amount!==0?
              <div className={'auth-page__bonus-text text-secondary'}>You choosed bonus {bonus.amount } BTC.<br/> With a bonus of {bonus.amount} BTC, for withdrawal,<br/> you need to make bets in the amount {bonus.amount * bonus.wager}</div> :
              null
            }

              <Checkbox
                  errors={errors?.license}
                  checked={formState.license}
                  onChange={(value) => handleStateUpdate(value, 'license')}
              >
                <div>
                  {t('I confirm that I agree to the')}
                  <NavLink to={'/'} className={'danger-link'}>
                    {t('License agreement')}
                  </NavLink>
                </div>
              </Checkbox>

              {errors.length ?
                  <div className={'errors-shower'}>
                    {t(errors?.registration)}
                  </div> : null
              }
              <div className="auth-page__buttons">
                <Button primary onClick={handleSubmit}>
                  {t('Sign Up')}
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