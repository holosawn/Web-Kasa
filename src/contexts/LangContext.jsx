import React from 'react'
import i18n from '../i18n';

const LanguageContext = React.createContext(null);

export function LanguageProvider({ initialState = 'en', children }) {
    const [lang, setLang] = React.useState(initialState);

    i18n.changeLanguage(lang)
  
    return (
      <LanguageContext.Provider value={{"lang": lang, "setLang": setLang}}>
        {children}
      </LanguageContext.Provider>
    )
  }
  
export function useLanguage() {
    return React.useContext(LanguageContext);
  }
