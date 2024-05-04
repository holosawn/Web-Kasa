import React, { useEffect } from 'react'
import i18n from '../i18n';

const LanguageContext = React.createContext(null);

export function LanguageProvider({ initialState = JSON.parse(sessionStorage.getItem('language')) || 'en', children }) {
    const [lang, setLang] = React.useState(initialState);

    // Applying inital language
    useEffect(()=>{
      const language = JSON.parse(sessionStorage.getItem('language')) || 'en'
      changeLanguage(language)
    },[])

    // @param input if it is an function the computed value will be set as language or it will be set language 
    const changeLanguage =(input)=>{
      if (typeof input ==='function') {
        setLang(prev => {
          const newLang = input(prev);

          sessionStorage.setItem('language', JSON.stringify(newLang))
          i18n.changeLanguage(newLang)

          return newLang
        })
      }
      else{
        sessionStorage.setItem('language', JSON.stringify(input))
        i18n.changeLanguage(input)
        setLang(input)
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

  