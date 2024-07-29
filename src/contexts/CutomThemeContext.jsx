import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'

// Also modifies scrollbar in MUI theme object 
function getTheme(mode){
  const theme = createTheme({
    palette:{
      mode:mode,
      background: {
        default: mode === 'dark' ? '#121212' : '#EAEBEF',
        paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
        secondary: mode === 'dark' ? '#191919' : '#D1D4DB',
        tertiary: mode === 'dark' ? '#262626' : '#C9C9C9',
      }
    },
    components:{
      MuiCssBaseline:{
        styleOverrides:{
          scrollbarColor: mode === 'dark' ? "#6b6b6b #2b2b2b" : "#c0c0c0 #f5f5f5",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: mode === 'dark' ? "#1E1E1E" : "#FFFFFF",
            width:'6px',
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? "#6b6b6b" : "#c0c0c0",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: mode === 'dark' ? "#959595" : "#a9a9a9",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: mode === 'dark' ? "#959595" : "#a9a9a9",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: mode === 'dark' ? "#959595" : "#a9a9a9",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: mode === 'dark' ? "#2b2b2b" : "#f5f5f5",
          },
        }
      }
    }
  });
  return theme;
}


const CustomThemeContext = React.createContext()

export function CustomThemeProvider({children}){
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = JSON.parse(localStorage.getItem('theme'))
  const [mode, setMode] = useState( storedTheme ? storedTheme : prefersDarkMode.matches ? 'dark' :'light');
  

  // // Detects prefered theme and applies it 
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   const handleChange = (e) => setMode(e.matches ? 'dark' : 'light');
  //   mediaQuery.addEventListener('change', handleChange);
  //   return () => {
  //     mediaQuery.removeEventListener('change', handleChange);
  //   };
  // }, []);

  // Stores selected theme in localStorage so it can be applied in next application run
  useEffect(()=>{
    localStorage.setItem('theme', JSON.stringify(mode))
  },[mode])
  
  const theme = React.useMemo( ()=> getTheme(mode) ,[mode])


  return(
      <CustomThemeContext.Provider value={{"mode":mode, "setMode":setMode, theme:theme}}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>  
      </CustomThemeContext.Provider>
  )
}

export function useCustomTheme(){
    return React.useContext(CustomThemeContext)
}
