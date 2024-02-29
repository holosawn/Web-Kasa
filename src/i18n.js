import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          login:{
            Welcome: 'Welcome Back!',
            app: 'Web Retail POS App',
            userCode: 'User Code',
            password:'Password',
            LogIn: 'Log In',
            Delete: 'Delete',
            clear: 'Delete All',
            support: 'For support',
            userCodeErr: 'User code is too short',
            passwordErr: 'Password is too short',
            submitErr: 'No user with given info',
          }
        }
      },
      tr: {
        translation: {
          login:{
            Welcome: 'Tekrar Hoşgeldin!',
            app: 'Web Kasa POS Uygulaması',
            userCode: 'Kullanıcı Kodu',
            password:'Şifre',
            LogIn: 'Giriş Yap',
            Delete: 'Sil',
            clear: 'Tümünü Sil',
            support: 'Destek için',
            userCodeErr: 'Kullanıcı kodu çok kısa',
            passwordErr: 'Şifre çok kısa',
            submitErr: 'Böyle bir kullanıcı yok',
          }
        }
      },
      ru: {
        translation: {
          login: {
            Welcome: 'С возвращением!',
            app: 'Приложение Web Cash Register POS',
            userCode: 'Код пользователя',
            password: 'Пароль',
            LogIn: 'Войти',
            Delete: 'Удалить',
            clear: 'Очистить все',
            support: 'Поддержка',
            useruserCodeErr: 'Слишком короткий код пользователя',
            passwordErr: 'Слишком короткий пароль',
            submitErr: 'Такого пользователя не существует'
            
          }
        }
      }
    }
  });

export default i18n;