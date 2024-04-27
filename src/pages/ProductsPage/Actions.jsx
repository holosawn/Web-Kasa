import { Height } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ForwardSharpIcon from "@mui/icons-material/ForwardSharp";
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next';

const Actions = () => {
    const navigate = useNavigate();
  return (
    <Grid 
        container
        direction={"row"}
        width={"90%"}
        mt={{ md:1, lg:2 }}
        height={{xs:"80px",md:'130px', lg:'108px'}}
        columnSpacing={1}
        rowSpacing={0.5}
        mb={1} 
     >
        <Grid item xs={6} sx={{...styles.gridItem}}>
            <ActionButton onClick={()=>{navigate('/Sale')}} color={'error'} >
                <ForwardSharpIcon sx={{ transform: "rotate(180deg)", fontSize:{xs:'15px', md:'22px', lg:'22px'} ,mr:0.5 }} />
                <ActionText>
                    {t('products.back')}
                </ActionText>
            </ActionButton>
        </Grid>
        <Grid item xs={6} sx={{...styles.gridItem}}>
            <ActionButton>
                <ActionText>
                    {t('products.menu')}
                </ActionText>
            </ActionButton>
        </Grid>
        <Grid item xs={6}  sx={{...styles.gridItem}}>
            <ActionButton color={'warning'}>
                <ActionText sx={{lineHeight:{xs:1, md:1.3}}} >
                    {t('products.addProduct')}
                </ActionText>
            </ActionButton>    
        </Grid>
        <Grid item xs={6}  sx={{...styles.gridItem}}>
            <ActionButton color={'warning'}>
                <SettingsOutlinedIcon sx={{fontSize:{xs:'small', lg:'20px'}}} key={"Settings"} />
                <ActionText>
                    {t('products.settings')}
                </ActionText>
            </ActionButton>
        </Grid>
    </Grid>
  )
}

const ActionButton = ({ children, ...props }) => (
    <Button
      variant="contained"
      sx={{
        width: "100%",
        height:'90%',
        // minWidth: 10,
        textTransform: "none",
        p: 0,
        px: 1,
        minHeight:{xs: 32, md:40}
  
      }}
      {...props}
    >
      <Stack
        direction={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        width={"100%"}
      >
        {children}
      </Stack>
    </Button>
  );

  const ActionText=({children, sx, ...props})=>{
    return(
        <Typography
            variant="caption"
            fontSize={{xs:'9px', md:'12px', lg:'14px', xl:'16px'}}
            sx={{ width: "100%", display: "flex", justifyContent: "center", ...sx }}
            ml={0.5}
            {...props}
        >
            {children}
        </Typography>
    )
  }

const styles={
    gridItem:{
        display:'flex', justifyContent:'center', alignItems:'center',
    },
    button:{
        height:'100%'
    }
}

export default Actions
