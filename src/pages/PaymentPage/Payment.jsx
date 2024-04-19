import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import ItemsList from "./ItemsList";
import Actions from "./Actions";
import Transactions from "./Transactions";

const Payment = () => {
  const [amountToPay, setAmountToPay] = useState(JSON.parse(sessionStorage.getItem('amountToPay')))

  return (
    <Container sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', height:'96vh', my:'2vh', minHeight:375}} >
      <ItemsList amountToPay={amountToPay}/>
      <Stack direction={'column'} bgcolor={"background.paper"} sx={{borderRadius:2, ml:1, height:'100%',  px:0.5,}}>
        <Actions amountToPay={amountToPay} />
        <Transactions setAmountToPay={setAmountToPay} />
      </Stack>
    </Container>
  );
};

export default Payment;
