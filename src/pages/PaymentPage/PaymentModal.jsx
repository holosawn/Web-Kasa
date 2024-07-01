import { Box, Button, CircularProgress, Divider, Fade, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import contaclessMethod from '../../assets/ContactlessPayment.jpg'
import swipeMethod from '../../assets/SwipeMethod.jpeg'
import insertMethod from '../../assets/InsertCard.jpg'
import PINEnter from '../../assets/PINEnter.jpg'
import { t } from 'i18next';

const steps=['choose','contact', 'payment', 'PIN', 'approve']
const methods=['tap', 'insert', 'swipe']

// Returns title according to given payment step
const getTitle = (step) => {
  switch (step) {
    case 'choose':
      return t('payment.choosePaymentMethod');
    case 'contact':
      return t('payment.cardPayment');
    case 'payment':
      return t('payment.cardPayment');
    case 'PIN':
      return t('payment.enterPIN');
    case 'approve':
      return t('payment.approveTransaction');
    default:
      return t('payment.cardPayment');
  }
}

const PaymentModal = ({ open, onClose }) => {
  const [proggress, setProggress]  = useState('choose')
  const [method, setMethod] = useState('')
  const [loading, setLoading] = useState(false)

  // Sets payment method and advances to next proggress
  const onMethodClick = (method) => {
    setMethod(method);
    setProggress('contact');
    startPayment(); // Pass method to startPayment
  };
  
  // Starts payment and advances after 2 seconds (2 second represent time of establishing connection in real word payments)
  const startPayment = () => { 
    setTimeout(() => {
      setProggress('payment');
      setLoading(true);
      initiatePayment(); 
    }, 2000);
  };
  
  // Connection established!! and advanced to pin enter or approval
  const initiatePayment = () => {
    setTimeout(() => {
      setLoading(false);
      if (method === 'insert') {
        toPINInput();
      } else {
        approvePayment();
      }
    }, 2000);
  };
  
  // PIN taken and after 2 seconds that represents passing time in real world next step is approval
  const toPINInput = () => {
    setTimeout(() => {
      setProggress('PIN');
      // Will toggle loading state fow a while for loading icon to show up
      toggleLoading();
      setTimeout(() => {
        approvePayment();
      }, 2000);
    }, 1000);
  };
  
  // Payment will be approved and finished
  const approvePayment = () => {
    setTimeout(() => {
      setProggress('approve');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        finishPayment()
      }, 1000);
    }, 1000);
  };
  
  // Will toggle loading state fow a while for loading icon to show up
  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // States cleared on Finish
  const finishPayment=()=>{
    setTimeout(() => {
      onClose()
      setTimeout(() => {
        setProggress('choose')
        setMethod('')
        setLoading(false)
      }, 200);
    }, 1000);
  }

  const onCloseButtonClick=()=>{
    onClose()
    setTimeout(() => {
      setProggress('choose')
      setMethod('')
      setLoading(false)
    }, 400);
  }

  return (
    <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    sx={{
      zIndex:9999
    }}
  >
    <Fade in={open}>
      
    <Box
        sx={styles.container}
      >
        <Box sx={{position:'relative', width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'end'}}>
          <Button sx={{position:'absolute', top:0, left:0, mt:2, ml:2}}  onClick={onCloseButtonClick} color='error' variant='contained' >
            {t('payment.cancel')}
          </Button>

          <Typography variant='h5' pt={3} color={'primary'} fontWeight={700} >
            {getTitle(proggress, method)}
          </Typography>
        </Box>
        <Divider sx={{width:'100%', mt:1}}  />
        
        {proggress === 'choose' && <ChooseMethod onClick={onMethodClick} />}
        {proggress === 'contact' && 
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>
            <img src={
              method === 'swipe' ? swipeMethod : method === 'insert' ? insertMethod : contaclessMethod
            } style={{...iconStyles[method]}}  />
            <Typography color={'primary'} variant='h6'>
              
              {t(`payment.${method}Card`)}
            </Typography>
          </Box>
        }
        {proggress === 'payment' && 
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>

            {loading 
              ? <CircularProgress size={60} color='success' />  
              : <CheckCircleIcon sx={{ fontSize: 60 }} color='success' /> 
            }
            <Typography color={'primary'} mt={1} variant='h6' fontWeight={700} >{t(`payment.pleaseWait`)}</Typography>
            <Typography  >{t(`payment.paymentInProggress`)}</Typography>
          </Box>
        }
        {
          proggress === 'PIN' &&
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>
              <CircularProgress size={60} color='success' style={{display: loading ? 'inline' : 'none'}} />  
              <img src={PINEnter}  style={{display: loading ? 'none' : 'inline', width:150, height:150}}  /> 
            
            <Typography color={'primary'} mt={1} variant='h6' fontWeight={700} >{loading ? t(`payment.pleaseWait`) : t(`payment.pleaseEnterPIN`)}</Typography>
          </Box>
        }
        {
          proggress === 'approve' &&
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>
            {loading 
              ? <CircularProgress size={60} color='success' />  
              : <CheckCircleIcon sx={{ fontSize: 60 }} color='success' /> 
            }
            <Typography color={'primary'} mt={1} variant='h6' fontWeight={700} >{loading ? t(`payment.pleaseWait`) : t(`payment.transactionApproved`)}</Typography>
          </Box>
        }

      </Box>
    </Fade>
  </Modal>
  )
}


const ChooseMethod=({onClick})=>(
  <Box sx={{ height:'100%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', mb:4, }}>
      <MethodButton onClick={()=>onClick('tap')} label={t('payment.contactless')} icon={contaclessMethod} imgSx={{width:120, height:80, }} />
      <MethodButton onClick={()=>onClick('swipe')} label={t('payment.swipe')} icon={swipeMethod} imgSx={{width:120, height:120, }} />
      <MethodButton onClick={()=>onClick('insert')} label={t('payment.insert')} icon={insertMethod} imgSx={{width:130, height:120, }} />
  </Box>
)

const MethodButton=({label, icon, imgSx, onClick})=>(
  <Stack onClick={onClick} direction={'column'} justifyContent={'center'} alignItems={'center'} 
    sx={{
      position:'relative', width:150, height:190,
      ":hover":{
        cursor:'pointer'
      }
    }} >
    <img src={icon} style={imgSx} />
    <Typography color={'warning.main'} fontWeight={700} sx={{position:'absolute', bottom:0}} >{label}</Typography>
  </Stack>

)

const iconStyles={
  'tap':{
    width:120, height:80, marginBlockEnd:'20px'
  },
  'swipe':{
    width:120, height:120, 
  },
  'insert':{
    width:130, height:120, 
  }
}

const styles={
  container:{
    position: "absolute",
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: "fit-content",
    height:300,
    p: 0,
    borderRadius: 3,
    minWidth:550,
    minHeight:300
  },
}


export default PaymentModal
