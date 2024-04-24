import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Numpad from '../../ReusableComponents/Numpad'
import { onlyNumLayout } from '../../utils/Numpadlayouts'
import PaymentModal from './PaymentModal';
import useSize from '../../CustomHooks/useSize';

const paymentTypes=['card', 'cash']

const commaKey={
  name:',',
  onClick:(setVal) => setVal(prev => prev + ',')
}

const Transactions = ({cartItems, amountToPay, setAmountToPay}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [transaction, setTransaction] = useState({
    amount:'',
    type:'cash'
  })
  const inputRef = useRef()
  const [size] = useSize();

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
  }

  // const onPayClick=()=>{
  //   if (transaction.type === 'card') {
  //     // todo make it asyn ?
  //     // setIsPaymentModalOpen(true)

  //   }
  //   else if(transaction.type === 'cash'){

  //     // setAmountToPay(prev => prev - parseFloat(transaction.amount.replace(',', '.')))

  //     // const pastTransactions = JSON.parse(sessionStorage.getItem('pastTransactions')) || []
  //     // sessionStorage.setItem('pastTransactions', JSON.stringify([...pastTransactions, transaction]))

  //     // setTransaction({
  //     //   amount:'',
  //     //   type:''
  //     // })
  //   }
  // }

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
    <Box sx={{ display:'flex', flexDirection:'column', mt: size.y < 500 ? 0.5 : 1, mt:'auto'}}>
      <Box  borderRadius={1} display={'flex'} flexDirection={'row'} sx={{width:size.y < 900 ? '98%' : '96%',mx:size.y < 900 ? '1%' : '2%', height:size.y < 400 ? 35 : size.y < 900 ? 45 : 70, mb: size.y< 400 ? 1 : 2 }}>
          <TextField fullWidth inputRef={inputRef} sx={{mr:0.2}} InputProps={{style:{height:'100%'}}} label={'Amount'} focused value={transaction.amount} onChange={handleInputChange} />
          <PaymentTypeButton label={'card'} transaction={transaction} onCardClick={onCardClick} />
          <PaymentTypeButton label={'cash'} transaction={transaction} onCardClick={onCashClick} />
      </Box>
      <Numpad setValue={handleAmountChange} layout={[...onlyNumLayout.slice(0,11), commaKey, ...onlyNumLayout.slice(11, onlyNumLayout.length)]} />
      <PaymentModal transaction={transaction} open={isPaymentModalOpen} onClose={onPaymentModalClose} />
    </Box>
  )
}

const PaymentTypeButton = ({ label, transaction, onCardClick }) => {
  return (
    <Button
      size="small"
      // fullWidth
      color='success'
      onClick={onCardClick}
      variant="contained"
      sx={{
        mr:0.2,
        textTransform:'none',
        fontSize:{xs:14, md:17, lg:20}
      }}
    >
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </Button>
  );
};

export default Transactions
