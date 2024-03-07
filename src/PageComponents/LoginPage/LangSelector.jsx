import React from 'react'
import { Select, MenuItem } from '@mui/material'
import { useLanguage } from '../../contexts/LangContext'

const LangSelector = ({handleChange})=>{
  const{lang, setLang} = useLanguage();
  return(
    <Select
    sx={{ ml: "auto" }}
    defaultValue={lang}
    size="small"
    onChange={(e) => handleChange(e.target.value)}
    >
        <MenuItem value={"tr"}>Türkçe</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"ru"}>Русский</MenuItem>
    </Select>
  )}

export default LangSelector
