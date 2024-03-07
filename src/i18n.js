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
          common:{
            loading:'Loading'
          },
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
          },
          menu: {
            Menu: 'Menu',
            statusStr: 'Market is ',
            online: 'Online',
            offline: 'Offline',
            storeNo: 'Store No',
            counterNo: 'Cash Desk No',
            counterIp: 'Cash Desk IP',
            version: 'Version',
            loginTime: 'Login Time',
            dashboard:'Dashboard',
            newSales: 'New Sales',
            manageSales: 'Manage Sales',
            refunds: 'Refunds',
            products: 'Products',
            reports: 'Reports',
            settings: 'Settings',
            exit: 'Exit'
          },
          dashboard:{
            today:'Today',
            yesterday:'Yesterday',
            thisWeek:'This Week',
            lastWeek:'Last Week',
            thisMonth: 'This Month',
            lastMonth: 'Last Month',
            grossSales: 'Gross Sales',
            netSales: 'Net Sales',
            costOfSales: 'Cost of Sales',
            grossProfit: 'Gross Profit',
            topProducts: 'Top Products',
            topCategories: 'Top Categories',
            discount: 'Discount',
            cashRefund: 'Cash Refund',
            creditNote: 'Credit Note'
          }
        }
      },
      tr: { 
        translation: {
          common:{
            loading:'Yükleniyor'
          },
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
          },
          menu: {
            Menu: 'Menü',
            statusStr: 'Market ',
            online: 'Çevrimiçi',
            offline: 'Çevrimdışı',
            storeNo: 'Mağaza No',
            counterNo: 'Kasa No',
            counterIp: 'Kasa IP',
            version: 'Sürüm',
            loginTime: 'Giriş Saati',
            dashboard:'Gösterge Paneli',
            newSales: 'Yeni Satışlar',
            manageSales: 'Satışları Yönet',
            refunds: 'İadeler',
            products: 'Ürünler',
            reports: 'Raporlar',
            settings: 'Ayarlar',
            exit: 'Çıkış'
          },
          dashboard: {
            today: 'Bugün',
            yesterday: 'Dün',
            thisWeek: 'Bu Hafta',
            lastWeek: 'Geçen Hafta',
            thisMonth: 'Bu Ay',
            lastMonth: 'Geçen Ay',
            grossSales: 'Brüt Satışlar',
            netSales: 'Net Satışlar',
            costOfSales: 'Satış Maliyeti',
            grossProfit: 'Brüt Kar',
            topProducts: 'En Çok Satılan Ürünler',
            topCategories: 'En Çok Satılan Kategoriler',
            discount: 'İndirim',
            cashRefund: 'Nakit İade',
            creditNote: 'Kredi Notu'
          }
        }
      },
      ru: {
        translation: {
          common:{
            loading:'Загрузка'
          },
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
          },
          menu: {
            Menu: 'Меню',
            statusStr: 'Статус',
            online: 'Онлайн',
            offline: 'Офлайн',
            storeNo: 'Номер магазина',
            counterNo: 'Номер кассы',
            counterIp: 'IP кассы',
            version: 'Версия',
            loginTime: 'Время входа',
            dashboard: 'Панель управления',
            newSales: 'Новые продажи',
            manageSales: 'Управление продажами',
            refunds: 'Возвраты',
            products: 'Товары',
            reports: 'Отчеты',
            settings: 'Настройки',
            exit: 'Выход'
          },
          dashboard: {
            today: 'Сегодня',
            yesterday: 'Вчера',
            thisWeek: 'На этой неделе',
            lastWeek: 'На прошлой неделе',
            thisMonth: 'В этом месяце',
            lastMonth: 'В прошлом месяце',
            grossSales: 'Валовая выручка',
            netSales: 'Чистая выручка',
            costOfSales: 'Себестоимость продаж',
            grossProfit: 'Валовая прибыль',
            topProducts: 'Топ-продукты',
            topCategories: 'Топ-категории',
            discount: 'Скидка',
            cashRefund: 'Возврат наличных',
            creditNote: 'Кредитное уведомление'
          }
        }
      }
    }
  });

export default i18n;