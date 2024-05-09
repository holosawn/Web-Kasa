import React, { useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, ClickAwayListener, InputAdornment, Grow, MenuList, Paper, Popper, TextField } from '@mui/material'; // Make sure to import the TextField and MenuItem components from @mui/material

// onvalueChange is an event handler takes value
// MenuItemsFunc is function that generates menu items it should take menuItem click handler and input value
// onDeleteIconClick is an function should execute durin deletion
function TextFieldWithMenu({value, onValueChange, menuItemsFunc, onDeleteIconClick, ...TextFieldProps}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef()

  const handleTextFieldFocus = () => {
    setMenuOpen(true);
  };

  const handleMenuItemClick = (value) => {
    onValueChange(value);
    closeMenu()
  };

  const handleTextFieldChange = (value) => {
    onValueChange(value);
  };

  const closeMenu = ()=>{
      setMenuOpen(false);
  }

  return (
    <ClickAwayListener onClickAway={closeMenu}>

        <Box flex={1} >
            <TextField
                onFocus={handleTextFieldFocus}
                value={value}
                ref={(r)=> inputRef.current = r}
                onChange={e=> handleTextFieldChange(e.target.value)}
                fullWidth
                {...TextFieldProps}
                autoComplete='off'
                InputProps={{
                    endAdornment:(
                        <InputAdornment sx={{
                            ":hover":{
                              cursor:'pointer'
                            }
                          }} 
                          onClick={()=>{
                            handleTextFieldChange('')
                            onDeleteIconClick()
                          }}
                          position='end' 
                        >
                          <ClearIcon width={25} sx={{fontSize:{xs:20, md:30}}} />
                        </InputAdornment>
                      )
                }}
            />
            <Popper
                open={menuOpen}
                anchorEl={inputRef.current}
                // keepMounted
                sx={{ zIndex:5000,width:inputRef.current?.offsetWidth || 'fit-content'}}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >

                {({ TransitionProps, placement }) => {
                    return(
                    <Grow
                    {...TransitionProps}
                    timeout={200}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                        <Paper sx={{width:'100%',}} >
                            <MenuList >
                                {menuItemsFunc(handleMenuItemClick, value)}
                            </MenuList>
                        </Paper>
                    </Grow>
                )}}
            </Popper>
            
        </Box>
    </ClickAwayListener>
  );
}



export default TextFieldWithMenu;