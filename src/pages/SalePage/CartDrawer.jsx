import { Badge, Box, Button, Drawer, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const CartDrawer = ({children, itemAmount, open, setOpen}) => {
    const isWide = useMediaQuery('(min-width:1000px)')


  return (
    <Box sx={{ position: 'absolute', right:0, height: '100%', minHeight:365, display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'flex-start' }}>
        { !isWide &&  
        <Button
        onClick={() => setOpen(prev => !prev)}
        variant="contained"
        color="warning"
        sx={{
            height: '100%',
            minWidth: 40,
            width: '5%',
            borderRadius: 0,
            pr:1.5,
            zIndex: 2999,
            ml:'auto'
        }}
        >
        <Badge badgeContent={itemAmount} color="primary" anchorOrigin={{vertical: 'top', horizontal: 'left'}} 
        sx={{
            '.MuiBadge-standard':{
            padding:0,
            minWidth:10,
            width:15,
            minHeight:10,
            height:15
            
            }
        }}
        >
            <ShoppingCartIcon fontSize="medium" />
        </Badge>

        </Button>}
        <Drawer
        keepMounted
        anchor={'right'}
        open={isWide || open}
        variant= {isWide ? 'persistent' : 'temporary' }
        >
            <Box bgcolor={'background.paper'} sx={{height:'100%', width:400, pr:5}} >
                {children}
            </Box>
        </Drawer>
    </Box>
  )
}

export default CartDrawer
