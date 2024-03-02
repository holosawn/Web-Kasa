import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'

function getTheme(mode){
    const theme = createTheme({
      palette:{
        mode:mode
      }
    })
    if (mode ==='dark') {
      theme.palette.background.secondary = '#191919'
      theme.palette.background.tertiary = '#262626'
    }
    else if(mode === 'light'){
      theme.palette.background.secondary = '#D1D4DB'
      theme.palette.background.tertiary = '#C9C9C9'
    }

    return theme
  }  

const CustomThemeContext = React.createContext()

export function CustomThemeProvider({children}){
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode.matches ? 'light' : 'light');
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setMode(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  const theme = React.useMemo( ()=> getTheme(mode) ,[mode])

  return(
      <CustomThemeContext.Provider value={{"mode":mode, "setMode":setMode, theme:theme}}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          {children}
        </ThemeProvider>  
      </CustomThemeContext.Provider>
  )
}

export function useCustomTheme(){
    return React.useContext(CustomThemeContext)
}
