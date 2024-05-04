import React from 'react'
import { Select, MenuItem } from '@mui/material'
import { useLanguage } from '../../contexts/LangContext'

const LangSelector = ({...props})=>{
  const{lang, setLang} = useLanguage();
  return(
    <Select
    sx={{ ml: "auto" }}
    inputProps={{style:{width:200}}}
    value={lang}
    size="small"
    onChange={(e) => setLang(e.target.value)}
    {...props}
    >
        <MenuItem value={"tr"}>Türkçe</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"ru"}>Русский</MenuItem>
    </Select>
  )}

export default LangSelector
