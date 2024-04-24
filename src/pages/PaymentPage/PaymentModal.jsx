import { Box, Button, CircularProgress, Divider, Fade, Grow, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import contaclessMethod from '../../assets/ContactlessPayment.jpg'
import swipeMethod from '../../assets/SwipeMethod.jpeg'
import insertMethod from '../../assets/InsertCard.jpg'
import PINEnter from '../../assets/PINEnter.jpg'

const steps=['choose','contact', 'payment', 'PIN', 'approve']
const methods=['tap', 'insert', 'swipe']

const getTitle = (step, method) => {
  switch (step) {
    case 'choose':
      return 'Choose Payment Method';
    case 'contact':
      return 'Card Payment';
    case 'payment':
      return 'Card Payment';
    case 'PIN':
      return 'Enter PIN';
    case 'approve':
      return 'Approve Transaction';
    default:
      return 'Card Payment';
  }
}

const PaymentModal = ({ transaction, open, onClose , onFinish}) => {
  const [proggres, setProggres]  = useState('choose')
  const [method, setMethod] = useState('')
  const [loading, setLoading] = useState(false)

  const onMethodClick = (method) => {
    setMethod(method);
    setProggres('contact');
    startPayment(method); // Pass method to startPayment
  };
  
  const startPayment = (method) => { // Receive method as an argument
    setTimeout(() => {
      setProggres('payment');
      setLoading(true);
      initiatePayment(method); // Pass method to initiatePayment
    }, 2000);
  };
  
  const initiatePayment = (method) => { // Receive method as an argument
    setTimeout(() => {
      setLoading(false);
      if (method === 'insert') {
        toPINInput();
      } else {
        approvePayment();
      }
    }, 2000);
  };
  
  const toPINInput = () => {
    setTimeout(() => {
      setProggres('PIN');
      toggleLoading();
      setTimeout(() => {
        approvePayment();
      }, 2000);
    }, 1000);
  };
  
  const approvePayment = () => {
    setTimeout(() => {
      setProggres('approve');
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        finishPayment()
      }, 1000);
    }, 1000);
  };
  
  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  const finishPayment=()=>{
    setTimeout(() => {
      onClose()
      setTimeout(() => {
        setProggres('choose')
        setMethod('')
        setLoading(false)
      }, 200);
    }, 1000);
  }

  // const onBackClick=()=>{
  //   const index = steps.findIndex(str => str=== proggres);
  //   if ( method !== 'insert' && steps[index -1] === 'PIN') {
  //     setProggres(steps[index-2])
  //   }
  //   else if(index >0 ) setProggres(steps[index-1]);

  // }

  const onCloseButtonClick=()=>{
    onClose()
    setTimeout(() => {
      setProggres('choose')
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
            Cancel
          </Button>
          {/* <Button sx={{position:'absolute', top:0, right:0, mt:2, mr:2}} disabled={loading} onClick={onBackClick} color='warning' variant='contained' >
          <Typography visibility={'hidden'}  >e</Typography> Back <Typography visibility={'hidden'}>e</Typography>
          </Button> */}
          <Typography variant='h5' pt={3} color={'primary'} fontWeight={700} >
            {/* {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Payment */}
            {getTitle(proggres, method)}
          </Typography>
        </Box>
        <Divider sx={{width:'100%', mt:1}}  />
        
        {proggres === 'choose' && <ChooseMethod onClick={onMethodClick} />}
        {proggres === 'contact' && 
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>
            <img src={
              method === 'swipe' ? swipeMethod : method === 'insert' ? insertMethod : contaclessMethod
            } style={iconStyles[method]} />
            <Typography color={'primary'} variant='h6' mt={6}>
              
              {method.charAt(0).toUpperCase() + method.slice(1)} The Card
            </Typography>
          </Box>
        }
        {proggres === 'payment' && 
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>

            {loading 
              ? <CircularProgress size={60} color='success' />  
              : <CheckCircleIcon sx={{ fontSize: 60 }} color='success' /> 
            }
            <Typography color={'primary'} mt={1} variant='h6' fontWeight={700} >Please Wait</Typography>
            <Typography  >Payment in progress</Typography>
          </Box>
        }
        {
          proggres === 'PIN' &&
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>
              <CircularProgress size={60} color='success' style={{display: loading ? 'inline' : 'none'}} />  
              <img src={PINEnter}  style={{display: loading ? 'none' : 'inline', width:150, height:150}}  /> 
            
            <Typography color={'primary'} mt={1} variant='h6' fontWeight={700} >{loading ? 'Please Wait' : 'Please Enter PIN'}</Typography>
          </Box>
        }
        {
          proggres === 'approve' &&
          <Box sx={{ marginBlock:'auto', display:'flex', flexDirection:'column', alignItems:'center' }}>
            {loading 
              ? <CircularProgress size={60} color='success' />  
              : <CheckCircleIcon sx={{ fontSize: 60 }} color='success' /> 
            }
            <Typography color={'primary'} mt={1} variant='h6' fontWeight={700} >{loading ? 'Please Wait' : 'Transaction Approved'}</Typography>
          </Box>
        }

      </Box>
    </Fade>
  </Modal>
  )
}


const ChooseMethod=({onClick})=>(
  <Box sx={{ height:'100%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', my:4}}>
      <MethodButton onClick={()=>onClick('tap')} label={'Contactless'} icon={contaclessMethod} imgSx={{width:120, height:80, }} />
      <MethodButton onClick={()=>onClick('swipe')} label={'Swipe'} icon={swipeMethod} imgSx={{width:120, height:120, }} />
      <MethodButton onClick={()=>onClick('insert')} label={'Insert'} icon={insertMethod} imgSx={{width:130, height:120, }} />
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
    width:120, height:80,
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
    height:'fit-content',
    p: 0,
    borderRadius: 3,
    minWidth:550,
    minHeight:300
  },
}

export default PaymentModal
