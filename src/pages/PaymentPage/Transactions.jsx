import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Numpad from '../../PageComponents/Sale/Numpad'
import { onlyNumLayout } from '../../utils/Numpadlayouts'
import PaymentModal from './PaymentModal';

const paymentTypes=['card', 'cash']

const Transactions = ({setAmountToPay}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [transaction, setTransaction] = useState({
    amount:'',
    type:''
  })
  const inputRef = useRef()
  const cartItems = JSON.parse(sessionStorage.getItem('cartItems'))

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setTransaction(prev => ({
        ...prev,
        amount: ''
      }));
    } else if (/^0[\d\s]*$/.test(inputValue) || /^[\d\s]+$/.test(inputValue)) {
      setTransaction(prev => ({
        ...prev,
        amount: parseInt(inputValue)
      }));
    }
  }

  function handleAmountChange(setVal) {
    setTransaction(prev => ({
      ...prev,
      amount : setVal(prev.amount)
    }));
    inputRef.current.focus()
  }

  const onCardClick=()=>{
    setTransaction(prev => ({
      ...prev,
      type:'card'
    }))
    setIsPaymentModalOpen(true)
  }

  const onCashClick=()=>{
    const currAmountToPay = JSON.parse(sessionStorage.getItem('amountToPay'))
    setAmountToPay(currAmountToPay - transaction.amount)
    sessionStorage.setItem('amountToPay', JSON.stringify(currAmountToPay - transaction.amount))
    setTransaction({
      amount:0,
      type:''
    })
  }

  const onPaymentModalClose=()=>{
    const currAmountToPay = JSON.parse(sessionStorage.getItem('amountToPay'))

    setAmountToPay(currAmountToPay - transaction.amount)
    sessionStorage.setItem('amountToPay', JSON.stringify(currAmountToPay - transaction.amount))

    setTransaction({
      amount:0,
      type:''
    })
    setIsPaymentModalOpen(false)
  }

  return (
    <Box sx={{ display:'flex', flexDirection:'column'}}>
      <Stack direction='row' sx={{mx:0.5}} >
        <TextField inputRef={inputRef} value={transaction.amount} sx={{flex:1, m:0.3}} onChange={handleInputChange} />
        <Button onClick={onCardClick} variant='contained' color='success' disabled={!parseInt(transaction.amount) > 0 || (cartItems || []).length < 1} sx={{m:0.3}}>Card</Button>
        <Button onClick={onCashClick} variant='contained' color='success' disabled={!parseInt(transaction.amount) > 0 || (cartItems || []).length < 1} sx={{m:0.3}}>Cash</Button>
      </Stack>
      <Box height={200}>
        <Numpad setValue={handleAmountChange} layout={onlyNumLayout} />
      </Box>
      <PaymentModal transaction={transaction} open={isPaymentModalOpen} onClose={onPaymentModalClose} />
    </Box>
  )
}

export default Transactions
