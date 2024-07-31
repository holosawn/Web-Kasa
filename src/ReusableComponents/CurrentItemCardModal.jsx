import React from 'react'
import CurrentItemCard from './CurrentItemCard'
import { Box, Fade } from '@mui/material'
import Numpad from './Numpad';
import { getNumLayout } from '../Constants/Numpadlayouts';
import { t } from 'i18next';

const CurrentItemCardModal=({ open, currentItem, setCurrentItem, cartItems, setCartItems})=>{

  function handleQtyChange(setVal) {
      setCurrentItem((prev) => ({
        ...prev,
        qty: setVal(currentItem.qty),
      }));
    }

  return open ? (
      <Fade in={true}>
          <Box position={'absolute'} left={'50%'} top={'50%'} bgcolor={'background.paper'} maxWidth={550} minWidth={330} pb={1} minHeight={250}
              zIndex={9999}
              sx={{
                  transform:'translate(-50%,-50%)',
                  width:550,
                  borderRadius:3,
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'space-between',
                  alignItems:'center',
                  zIndex:999
              }}
              >
              <CurrentItemCard
              item={currentItem}
              setItem={setCurrentItem}
              cartItems={cartItems}
              setCartItems={setCartItems}
              setNumpadFocus={()=>{}}
              boxSx={{
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  border:'none',
                  mt:1,
              }}
              />
              <Numpad setValue={handleQtyChange} layout={getNumLayout(t)} />
          </Box>
      </Fade>
  )
  : null
  }

export default CurrentItemCardModal
