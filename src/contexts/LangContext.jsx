import React, { useEffect } from 'react'
import i18n from '../i18n';

const LanguageContext = React.createContext(null);

export function LanguageProvider({ initialState = JSON.parse(sessionStorage.getItem('language')) || 'en', children }) {
    const [lang, setLang] = React.useState(initialState);

    useEffect(()=>{
      const language = JSON.parse(sessionStorage.getItem('language')) || 'en'
      changeLanguage(language)
    },[])

    const changeLanguage =(updateFunc)=>{
      if (typeof updateFunc ==='function') {
        setLang(prev => {
          const newLang = updateFunc(prev);

          sessionStorage.setItem('language', JSON.stringify(newLang))
          i18n.changeLanguage(newLang)

          return newLang
        })
      }
      else{
        sessionStorage.setItem('language', JSON.stringify(updateFunc))
        i18n.changeLanguage(updateFunc)
        setLang(updateFunc)
      }
    }
  
    return (
      <LanguageContext.Provider value={{"lang": lang, "setLang": changeLanguage}}>
        {children}
      </LanguageContext.Provider>
    )
  }
  
export function useLanguage() {
    return React.useContext(LanguageContext);
  }

  