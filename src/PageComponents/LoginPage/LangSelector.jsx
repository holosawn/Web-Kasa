import React from 'react'
import { Select, MenuItem } from '@mui/material'

const LangSelector = ({handleChange})=>(
    <Select
    sx={{ ml: "auto" }}
    defaultValue="en"
    size="small"
    onChange={(e) => handleChange(e.target.value)}
    >
        <MenuItem value={"tr"}>Türkçe</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"ru"}>Русский</MenuItem>
    </Select>
  )

export default LangSelector
