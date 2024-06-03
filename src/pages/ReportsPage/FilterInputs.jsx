import { Box, InputAdornment, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import CustomTextField from '../../ReusableComponents/CustomTextField'
import TextFieldWithMenu from '../../ReusableComponents/TextFieldWithMenu'
import useAlert from '../../CustomHooks/useAlert.js'
import { formatDateToISO } from '../../utils/helpers.js'

const exampleShops = [
    'Çerkezköy Şube',
    'Kapaklı Şube',
    'Serdivan Şube',
]


const FilterInputs = ({filterValues ,setFilterValues}) => {
    const [showAlert, AlertComponent] = useAlert();
    // const [size, setSize] = useSize();

    const handleFieldChange=(input, inputName)=>{
        setFilterValues(prev => ({
            ...prev,
            [inputName]: typeof input === 'function' ? input(prev[inputName]) : input
        })) 
    }

    const menuItemsFunc = (extraMenuItemClick ) => {

        const handleMenuItemClick = (value) => {
            handleFieldChange(value, 'shop')
            extraMenuItemClick(value)
        }

        return(
        exampleShops.map(shop => (
            <MenuItem key={shop} selected={filterValues.shop == shop} onClick={() =>handleMenuItemClick(shop)} >
                {shop}
            </MenuItem>
        )))
    }

    const handleShopInputDelete= () => {
        setFilterValues(prev => ({
            ...prev,
            shop:''
        }))
    }

  return (
    <Box gap={2} sx={{backgroundColor:'background.paper' , display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center',  width:'100%', height:80,  px:1, borderRadius:3, displayPrint:'none'}} >
        <CustomTextField value={filterValues.id} setValue={value => handleFieldChange(value, 'id')} 
            size='small'
            placeholder='Search By ID'
            sx={{
                width: '30%',
                height:'fit-content',
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
                width:'100%',
                borderRadius:0,
                fontSize:{xs:12, md:15},
                height:{xs:30, md:40},
                },
                
            }}
        />

        <TextFieldWithMenu value={filterValues.shop} onValueChange={value => handleFieldChange(value, 'shop')} menuItemsFunc={menuItemsFunc} onDeleteIconClick={handleShopInputDelete}
            placeholder="Search Shops"
            size='small'
            ContainerProps={{
                sx:{
                    height:'fit-content',
                    width:'30%',
                }
            }}
            TextFieldsx={{
                height:'fit-content',
                display:'flex',
                alignItems:'center',
                "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-input": {
                        pb: 0.4,
                        px: 0.5,
                      },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: 'none', // Remove the border
                        borderBottom: '1px solid rgba(0, 0, 0, 0.42)', // Border at the bottom
                        borderRadius:0,
                      },
                    "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderBottom: '1px solid #3f51b5', // Thicker border on hover
                    },
                    }
                },
            }}
            inputProps={{
                sx:{
                    fontSize:{xs:12, md:15},
                    height:{xs:30, md:40},
                    backgroundColor:'background.paper',
                },


            }}
        />

        <Box display={'flex'} flexDirection={'row'}  width={'35%'} alignItems={'center'} gap={0.7} >
            <TextField
            value={filterValues.startDate}
            onChange={e => handleFieldChange(e.target.value, 'startDate')}
            type="date"
            size='small'
            sx={{
                width:'45%',
                backgroundColor:'background.paper',
                "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-input": {
                        pb: 0.4,
                        px: 0.5,
                        fontSize:15
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
                
            }}
            InputProps={{
                sx:{
                    ":hover":{
                        cursor:'pointer'
                    },
                    fontSize:{xs:12, md:15},
                    height:{xs:30, md:40},
                    color:'text.secondary',
                    borderRadius:0,
                    padding:0
                },
            }}
            />

            <Typography display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={20}  color={'text.secondary'} >---</Typography>

            <TextField
            value={filterValues.endDate}
            onChange={e => handleFieldChange(e.target.value, 'endDate')}
            type='date'
            size='small'
            sx={{
                width:'45%',
                "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-input": {
                        pb: 0.4,
                        px: 0.5,
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
            }}
            InputProps={{
                sx:{
                    ":hover":{
                        cursor:'pointer'
                    },
                    fontSize:{xs:12, md:15},
                    height:{xs:30, md:40},
                    color:'text.secondary',
                    borderRadius:0,
                    padding:0
                },
            }}
            />
        </Box>

        <AlertComponent/>
    </Box>
  )
}

export default FilterInputs
