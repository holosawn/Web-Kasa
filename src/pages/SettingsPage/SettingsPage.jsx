import React, { useState } from 'react';
import { Box, Button,Divider, Grid, MenuItem, Select, Stack, Switch, Typography, styled} from '@mui/material';
import LangSelector from '../../ReusableComponents/LangSelector';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ReceiptModal from '../PaymentPage/ReceiptModal';
import { useCustomTheme } from '../../contexts/CutomThemeContext';
import useSize from '../../CustomHooks/useSize';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { printerTestValues } from './PrinterTestValues';


const SettingsPage = () => {
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const {mode, setMode} = useCustomTheme();
  const [size] = useSize();
  const navigate = useNavigate();

  const { cartItems, subtotal, savedByOffers, amountToPay, discount, total, activeCoupons, payments } = printerTestValues;

  const closeReceiptModal=()=>{
    setIsReceiptModalOpen(false)
  }

  // Store payments to reach them on receipt modal
  const openReceiptModal=()=>{
    sessionStorage.setItem('pastTransactions', JSON.stringify(payments))
    setIsReceiptModalOpen(true)
  }

  // Event handler for theme 
  const handleSwitchChange = (e)=>{
    setMode(e.target.checked ? 'light' : 'dark')
  }


  return (
    <Box  minHeight={375}  minWidth={665} display="flex" flexDirection="column" alignItems={'center'} textAlign={'center'} sx={{height:'100vh', width:'100vw',}} >
      <Grid container bgcolor={'background.paper'} sx={{borderRadius: size.x< 700 ? 0 : 3, my:'auto', width: size.x < 700 ? '100%' : '80%', heigth:size.y < 500 ? '100%' : '80%', maxHeight:'100%'}} >
        
        <Grid item xs={12} my={2} mb={2}>
          <Typography color={'primary'} fontSize={{xs:16, md:22, lg:26, xl:30}} variant='h5' fontWeight={700} letterSpacing={0.7} >{t('settings.applicationSettings')}</Typography>
        </Grid>
        <SettingsDivider />

        <GridItem >
          <TitleWithDescription title={t('settings.language')} description={t('settings.langDesc')} />
          <LangSelector size='large' sx={{width:130, height: size.y < 500 ? 35 : 50, ml:'auto'}} />
          <SettingsDivider sx={{position:'absolute', bottom:0, left:0}} />
        
        </GridItem>

        
        <GridItem >
          <TitleWithDescription title={t('settings.alternativeCurrency')} description={t('settings.altDesc')} />
          <Select size='large' sx={{width:130, ml:'auto', height: size.y < 500 ? 35 : 50}} defaultValue={'TRY'} >
            <MenuItem value={'TRY'} >
              TRY
            </MenuItem>
            <MenuItem value={'USD'} >
              USD
            </MenuItem>
          </Select>
          <SettingsDivider sx={{position:'absolute', bottom:0, left:0}} />
        </GridItem >

        <GridItem >
          <TitleWithDescription title={t('settings.theme')} description={t('settings.themeDesc')} />
          <Stack direction={'row'} alignItems={'center'} ml={'auto'} height={size.y < 500 ? 35 : 50} >
            <DarkModeIcon color='black' />
            <ThemeSwitch checked={mode === 'light'} onChange={handleSwitchChange} />
            <LightModeIcon color='warning' />
          </Stack>
          <SettingsDivider sx={{position:'absolute', bottom:0, left:0}} />

        </GridItem>
        
        <GridItem >
          <TitleWithDescription title={t('settings.printerTest')} description={t('settings.printerDesc')} />
          <SettingsButton onClick={openReceiptModal} label={t('settings.testPrinter')} />
          <SettingsDivider sx={{position:'absolute', bottom:0, left:0}} />

        </GridItem>

        <GridItem >
          <TitleWithDescription title={t('settings.tableRoom')} description={t('settings.tableDesc')} />
          <Switch size='large' sx={{ml:'auto', mr:3, transform:'scale(1.2)'}} />
          <SettingsDivider sx={{position:'absolute', bottom:0, left:0}} />

        </GridItem>

        <GridItem >
          <TitleWithDescription title={t('settings.multiPayment')} description={t('settings.multiPaymentDesc')} />
          <Switch size='large' sx={{ml:'auto', mr:3, transform:'scale(1.2)'}} />
          <SettingsDivider sx={{position:'absolute', bottom:0, left:0}} />

        </GridItem>


        <GridItem xs={12} sx={{py:0, mb:size.y < 900 ? 0 : 1, mt:1 }} >
          <SettingsButton label={t('settings.exit')} onClick={()=>navigate(-1)} sx={{mb:0, mt:0, width: size.x < 800  ?  120  : size.x < 1300 ? 140 : 160, height: size.y < 500 ? 40 : size.y < 800 ?  45 : 50  }} />
        </GridItem>

       <ReceiptModal cartItems={cartItems} subTotal={subtotal} total={total} discount={discount} savedByOffers={savedByOffers} amountToPay={amountToPay} activeCoupons={activeCoupons} open={isReceiptModalOpen} onClose={closeReceiptModal} />
      </Grid>
    </Box>
  );
};

const TitleWithDescription = ({ title, description }) => (
  <Stack direction="column" alignItems="start">
    <Typography variant="h7" fontSize={{xs:11, md:15, xl:20}} fontWeight={500}>
      {title}
    </Typography>
    <Typography color="gray" fontSize={{xs:7, md:10, xl:14}} textAlign={'start'} >{description}</Typography>
  </Stack>
);

const GridItem = ({children, sx, ...props})=>(
  <Grid item xs={6} md={12} sx={{position:'relative', px:3, pb:{xs:1, md:1.5, lg:2}, my:1, borderRadius:3, display:'flex', flexDirection:'row', alignItems:'center' , ...sx}} {...props} >
    {children}
  </Grid>
)

const SettingsDivider = ({ sx }) => (
  <Divider sx={{ width: "100%", ...sx }} />
);

const SettingsButton = ({ label, onClick, sx }) => {
  const [size] = useSize();
  return (
  <Button
    variant="contained"
    color="success"
    sx={{textTransform:'none',  ml: "auto", mr: 0, mb: 2, mt: 1,  height: size.y < 500 ? 35 : size.y < 800 ?  40 : 45 , width: 120, fontSize:{xs:8, md:12, xl:16}, ...sx }}
    onClick={onClick}
  >
    {label}
  </Button>
)};

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      // transform: 'translateX(22px)',
      color: 'orange', // Change color when checked
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.warning.main, // Track color when checked
        opacity: 1,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.warning.main, // Thumb color when checked
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: 'black', // Default thumb color
  },
  '& .MuiSwitch-track': {
    borderRadius: 17,
    backgroundColor: 'black', // Default track color
    opacity: 1,
  },
}));

export default SettingsPage


