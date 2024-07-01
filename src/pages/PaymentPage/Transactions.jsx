import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import Numpad from '../../ReusableComponents/Numpad'
import { getNumLayout } from '../../Constants/Numpadlayouts';
import PaymentModal from './PaymentModal';
import useSize from '../../CustomHooks/useSize';
import { t } from 'i18next';
import useAlert from '../../CustomHooks/useAlert';

const commaKey={
  name:',',
  onClick:(setVal) => setVal(prev => prev + ',')
}

const Transactions = ({cartItems, amountToPay, setAmountToPay}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  // Current transaction state to execute
  const [transaction, setTransaction] = useState({
    amount:'',
    type:'cash'
  })
  // State of textField input
  const inputRef = useRef()
  const [showAlert, AlertComponent] = useAlert();
  const [size] = useSize();

  // Validates given input before updating to state
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setTransaction(prev => ({
        ...prev,
        amount: ''
      }));
    } else if (/^0[\d\s]*$/.test(inputValue) || /^[\d\s,]+$/.test(inputValue)) {
      setTransaction(prev => ({
        ...prev,
        amount: inputValue
      }));
    }
  }

  // Callback function to pass into Numpad component
  // It will set output of given function eith prev transaction state passed as parameter
  function handleAmountChange(setVal) {
    setTransaction(prev => ({
      ...prev,
      amount : setVal(prev.amount)
    }));
    inputRef.current.focus()
  }

  // Starts card payment chain functionality
  const onCardClick=()=>{
    if (transaction.amount > amountToPay) {
      showAlert('warning', t('payment.invalidCardAmount'), t('payment.invalidCardAmountDesc') )
    }
    else{
      setTransaction(prev => ({
        ...prev,
        type:'card'
      }))

      setIsPaymentModalOpen(true)
    }
  }
  
  // Stores transaction into sessionStorage
  const onCashClick=()=>{
    setTransaction(prev =>({
      ...prev,
      type:'cash'
    }))

    setAmountToPay(prev => prev - parseFloat(transaction.amount.replace(',', '.')))

    const pastTransactions = JSON.parse(sessionStorage.getItem('pastTransactions')) || []
    sessionStorage.setItem('pastTransactions', JSON.stringify([...pastTransactions, transaction]))

    setTransaction({
      amount:'',
      type:''
    })
    showAlert('success', t('payment.successfulCashPayment'), t('payment.successfulCashPaymentDesc') )
  }

  // Stores transaction on card payment modal close
  const onPaymentModalClose=()=>{

    setAmountToPay(prev => prev - transaction.amount.replace(',', '.'))

    const pastTransactions = JSON.parse(sessionStorage.getItem('pastTransactions')) || []
    sessionStorage.setItem('pastTransactions', JSON.stringify([...pastTransactions, transaction]))

    setTransaction({
      amount:'',
      type:''
    })
    setIsPaymentModalOpen(false)
  }

  return (
    <Box sx={{ display:'flex', width:'100%', flexDirection:'column', alignItems:'center', mt: size.y < 500 ? 0.5 : 1, mt:'auto'}}>
      <Box borderRadius={1} display={'flex'} flexDirection={'row'} sx={{width:size.y < 900 ? '98%' : '96%',mx:size.y < 900 ? '1%' : '2%', height:size.y < 600 ? 35 : size.y < 900 ? 55 : 70, mb: size.y< 400 ? 1 : 2 }}>
          <TextField fullWidth inputRef={inputRef} autoComplete='off' sx={{mr:0.2}} InputProps={{style:{height:'100%'}}} label={t(`payment.amount`)} focused value={transaction.amount} onChange={handleInputChange} />
          <PaymentTypeButton label={t(`payment.card`)} disabled={!transaction.amount > 0 || amountToPay < 0 || !cartItems.length > 0} transaction={transaction} onCardClick={onCardClick} />
          <PaymentTypeButton label={t(`payment.cash`)} disabled={!transaction.amount > 0 || amountToPay < 0 || !cartItems.length > 0} transaction={transaction} onCardClick={onCashClick} />
      </Box>
      <Numpad setValue={handleAmountChange} layout={[...getNumLayout(t).slice(0,11), commaKey, ...getNumLayout(t).slice(11, getNumLayout(t).length)]} />
      <PaymentModal open={isPaymentModalOpen} onClose={onPaymentModalClose} />
      <AlertComponent sx={{width:330}} />
    </Box>
  )
}

const PaymentTypeButton = ({ label, disabled, onCardClick }) => {
  return (
    <Button
      size="small"
      // fullWidth
      disabled={disabled}
      color='success'
      onClick={onCardClick}
      variant="contained"
      sx={{
        mr:0.2,
        // textTransform:'none',
        // fontSize:{xs:14, md:17, lg:20},
        minWidth:{md:90}
      }}
    >
      <Typography width={'fit-content'} textTransform={'none'} fontSize={{xs:11, md:15, xl:20}} >{label.charAt(0).toUpperCase() + label.slice(1)}</Typography>
    </Button>
  );
};

export default Transactions
