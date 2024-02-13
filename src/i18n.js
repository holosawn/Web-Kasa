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
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          login:{
            Welcome: 'Welcome Back!',
            app: 'Web Retail POS App',
            userCode: 'userCode',
            password:'password',
            LogIn: 'Log In',
            Delete: 'Delete',
            clear: 'Delete All',
            support: 'For support'
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
            support: 'Destek için'
          }
        }
      },
    }
  });

export default i18n;