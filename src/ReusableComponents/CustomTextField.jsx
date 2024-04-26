import {
  Box,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as SearchIcon} from '../assets/Search.svg';
import { t } from "i18next";
import ClearIcon from '@mui/icons-material/Clear';


const CustomTextField=({value, setValue, sx, setNumpadFocus, ...props})=>{
  const [size, setSize] = useState({x:window.innerWidth, y:window.innerHeight})    

  useEffect(() => {
    function handleResize() {
      setSize({x:window.innerWidth, y:window.innerHeight})
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return(
    <TextField
        value={value}
        onFocus={()=> setNumpadFocus('products')}
        variant={'outlined'}
        autoComplete="off"
        onChange={handleChange}
        placeholder={t('sale.searchAll')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"  >
              <SearchIcon width={17}/>
            </InputAdornment>
          ),
          endAdornment:(
            <InputAdornment sx={{
              ":hover":{
                cursor:'pointer'
              }
            }} 
            onClick={()=>{setValue('')}}
            position='end' >
              <ClearIcon width={17} />
            </InputAdornment>
          ),
          sx:{
            fontSize:{xs:10, md:15}
          }
        }}
        size={size.y > 400 ? "large": 'small'}
        
        sx={{
          width:'100%',
          backgroundColor:'background.paper',
          mb:{xs:0, md:1},
          fontSize:'10px',
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            '& fieldset': {
              borderRadius: 2,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "0px",
              transition: 'box-shadow 0.2s ease', // Transition for boxShadow
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border:'0.1px solid #AEAECD',
                boxShadow: '0 0 0 5px #C5C8DC', // Adjust the alpha value (0.5) for transparency
              },
            }
          },
        }}
      />
  )
}

export default CustomTextField;
