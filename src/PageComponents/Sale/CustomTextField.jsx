import {
  Box,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { ReactComponent as SearchIcon} from '../../assets/Search.svg';


const CustomTextField=({value, setValue, sx, setNumpadFocus, ...props})=>{

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return(
    <TextField
        autoFocus
        value={value}
        onFocus={()=> setNumpadFocus('products')}
        variant={'outlined'}
        color=""
        autoComplete="off"
        onChange={handleChange}
        placeholder="Search All"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"  >
              <SearchIcon width={17}/>
            </InputAdornment>
          )
        }}
        size="small"
        sx={{
          width:'100%',
          backgroundColor:'background.paper',
          mb:1,
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
