import {initReactI18next, useTranslation} from "react-i18next";
import i18n from "i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Start': 'Start',
          'Roulette': 'Roulette',
          'Sign In': 'Sign In',
          'You are guest': 'You are guest',
          'Dice': 'Dice',
          '© Bitcoin Roulette': '© Bitcoin Roulette',
          'License agreement': 'License agreement',
          'License agreements': 'License agreements',
          'Payment proof': 'Payment proof',
          'Sign Up': 'Sign Up',
          'Log In': 'Log In',
          'Password': 'Password',
          'Confirm Password': 'Confirm Password',
          'Forgot your password?': 'Forgot your password?',
          'I confirm that I agree to the': 'I confirm that I agree to the',
          'Email': 'Email',
          'Email of Phone': 'Email or Phone',
          'Log Out': 'Log Out'

        }
      },
      ru: {
        translation: {
          'Start': 'Старт',
          'Roulette': 'Рулетка',
          'Sign In': 'Войти',
          'You are guest': 'Вы гость',
          'Dice': 'Кости',
          '© Bitcoin Roulette': '© Биткоин Рулетка',
          'License agreement': 'Лицензионное соглашение',
          'License agreements': 'Лицензионным соглашением',
          'Payment proof': 'Оплата',
          'Sign Up': 'Регистрация',
          'Log In': 'Авторизоваться',
          'Password': 'Пароль',
          'Confirm Password': 'Подтверждение пароля',
          'Forgot your password?': 'Забили пароль?',
          'I confirm that I agree to the': 'Я подтверждаю, что согласен с',
          'Email or Phone': 'Email или Телефон',
          'Log Out': 'Выйти'
        }
      },
    },
    lng: localStorage.lang,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export const $t = (text: string) => {

  const {t} = useTranslation();

  const data: string = t(`${text}`)

  return data
}