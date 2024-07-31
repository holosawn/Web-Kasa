import React from 'react'
import CustomTextField from '../../ReusableComponents/CustomTextField'
import { t } from 'i18next'

const CustomFilterTextField = ({filterValue, setFilterValue}) => {
  return (
    <CustomTextField value={filterValue} setValue={setFilterValue} 
    size='small'
    placeholder= {t('customers.searchPlaceHolder')}
    sx={{
        width:'50%',
        maxWidth:700,
        height:'100%',
        ml:{xs:1, lg:3},
        mb:0,
        "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-input": {
                pb: 0.4,
                px: 0.5
            },
            "& .MuiOutlinedInput-notchedOutline": {
                border: 'none', // Remove the border
                borderBottom: '1px solid rgba(0, 0, 0, 0.42)', // Border at the bottom
            },
            "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderBottom: '1px solid #3f51b5', // Thicker border on hover
            },
            }
        },
        // borderRadius: 0, 
    }}
    inputProps={{
        sx:{
            fontSize:{xs:12, md:15},
            height:{xs:40, md:55},
            width:'99%',
            p:0,
            borderRadius:0
        },
        
    }}
/>
  )
}

export default CustomFilterTextField
