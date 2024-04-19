import { Button, Grid, colors } from '@mui/material'
import React from 'react'

const buttons=[
  {
    label:'Finish' ,
    color:'success'
  },
  {
    label:'E-Fatura',
    color:'warning'
  },
  {
    label:'Hediye Çeki',
    color:'success'
  },
  {
    label:'Preview',
    color:'warning'
  },
  {
    label:'Cancel',
    color:'error'
  },
]

const Actions = () => {
  //todo finish, e fatura, preview, cancel
  return (
    <Grid container rowSpacing={0} columnSpacing={0} sx={{width:'100%', minHeight:210, mx:'auto'}} >
      {buttons.map(btn => (
        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' color={btn.color} sx={{width:'94%',textTransform:'none', height:'80%'}} >
            {btn.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default Actions
