import { Box, Button, Divider, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography, colors } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { enLayout, trLayout, ruLayout } from "../LangLayouts/LayoutsWithoutArrows";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useCustomTheme } from '../contexts/CutomThemeContext';
import buttons from "../Constants/KeyboardButtons";
import { t } from 'i18next';
import { useLanguage } from '../contexts/LangContext';
import useSize from '../CustomHooks/useSize';
import '../pages/LoginPage/loginKeyboard.css'
import useAlert from '../CustomHooks/useAlert';
import LoadingButton from './LoadingButton';

const layouts = {
    en: enLayout,
    ru: ruLayout,
    tr: trLayout,
  };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCustomerValues = (customerValues, setErrors) => {
const errors = {};
if (customerValues.name.trim() === "") {
    errors.name = t('common.emptyName');
    console.log(errors.name);
}
else if(/\d/.test(customerValues.name)){//regex for digits test
  errors.name = t('common.invalidName')
}
else if(customerValues.name.trim().length < 3){
  errors.name= t('common.shortName')
}

if (customerValues.surname.trim() === "") {
    errors.surname = t('common.emptySurname');
}
else if(/\d/.test(customerValues.surname)){//regex for digits test
  errors.surname = t('common.invalidSurname')
}
else if(customerValues.surname.trim().length < 2){
  errors.surname= t('common.shortSurname')
}

if (customerValues.telNo.trim() === "") {
  errors.telNo = t('common.emptyTelNo');
}
else if(customerValues.telNo.includes('a')){//regex for letter test
errors.telNo = t('common.invalidTelNo')
}
else if(customerValues.telNo.trim().replace(' ', '').length < 10){
errors.telNo= t('common.shortTelNo')
}

if (customerValues.email.trim() === "") {
  errors.email = t('common.emptyEmail')
}
else if(!emailRegex.test(customerValues.email.trim())){
  errors.email = t('common.invalidEmail')
}

if (customerValues.gender === "") {
  errors.gender = t('common.emptyGender');
}

if (customerValues.age === "") {
  errors.age = t('common.emptyAge');
}

setErrors(errors);
};

const AddCustomerModal=({open, onClose, onSubmit, customerId, customersOnSystem, setCustomersOnSystem})=>{
    const [customerValues, setCustomerValues] = useState({
        id:customerId,
        name:'',
        surname:'',
        telNo:'',
        email:'',
        age: '',
        gender:''
    }) 
    const keyboardRef = useRef()
    // keyboard layout caps lock open/closed
    const [layout, setLayout] = useState("default");
    const {lang, setLang} = useLanguage();
    const inputRefs = useRef({
        name:useRef(),
        surname:useRef(),
        telNo:useRef(),
        email:useRef(),
    })
    const [errors, setErrors] = useState({
        name: t('common.emptyName'),
        surname:true,
        telNo:true,
        email: true,
        submit:'',
        gender: true,
        age: true
    });
    const {mode} = useCustomTheme()
    const [size] = useSize()
    const [showAlert, AlertComponent] = useAlert();
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
      if (customerId) {
        const customer = customersOnSystem.find((customer) => customer.id === customerId)
        if (customer) {
          setCustomerValues(customer)
        }
      }
    }, [customerId])
    
  // Setting value into keyboard and validating values
    const onInputChange = (input, inputName) => {
      let inputRefName ;

      if (!inputName) {
        inputRefName = keyboardRef.current.inputName;        
      }
      const initCustomerValues = { ...customerValues, [(inputName || inputRefName)]: input };
  
      setCustomerValues(initCustomerValues);
      validateCustomerValues(initCustomerValues, setErrors);
      keyboardRef.current.setInput(input);
    };

    function handleShift() {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    }

    // Focusing keyboard into field
    const onFocus = (event) => {
        const inputName = event.target.name;
        keyboardRef.current.setInput(customerValues[inputName]);
        keyboardRef.current.inputName = inputName;
    };

    // Sets states from keyboard and validates values 
    const onChange = (input) => {
        const inputName = keyboardRef.current.inputName;
        const initCustomerValues = { ...customerValues, [inputName]: input };
        setCustomerValues(initCustomerValues);
        validateCustomerValues(initCustomerValues, setErrors);
        if(errors.submit !== '') setErrors(prev => ({...prev, submit:true}))
    };
    

    function onKeyPress(button) {
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{clear}") onInputChange("");
        if (button === "{bksp}") customOnBksp();
    }
    
    const customOnBksp = () => {
        const inputName = keyboardRef.current.inputName;
        if (inputName) {
          const newValue = customerValues[inputName].slice(0, -1);
          onChange(newValue);
        }
    };

    // If values are valid it computes a date string and saves the customer with date string and an unique id into localStorage
    const handleSubmit = (event) => {
      setIsLoading(true)
        event.preventDefault();
        const anyError = Object.values(errors).find((value) => {
          if (value !== "") {
            return value
          }
        });
        setTimeout(()=>{
          if (!anyError) {
            setIsLoading(false)

            let customerIndex = -1;
            if (customersOnSystem) {
              customerIndex = customersOnSystem.findIndex((customer) => customer.id === customerValues.id)
            }

            let isDuplicate = false
            
            if (customerIndex !== -1) {
              // Update existing customer
              const updatedCustomer = {
                ...customerValues,
                signUp: customersOnSystem[customerIndex].signUp,
                id: customerValues.id,
              };
              
              const tempCustomers = [...customersOnSystem]
              tempCustomers[customerIndex] = updatedCustomer;
              setCustomersOnSystem(tempCustomers)
              if (onSubmit) {
                onSubmit()                
              }
              showAlert("success", t("common.customerUpdated"), t("common.customerUpdateSuccess"));

            } else {
              // Create new customer
              const signUpDate = new Date();
              const yearMonthDay = signUpDate.toISOString().split("T")[0]; // Gets the date part (YYYY-MM-DD)
              const hour = signUpDate.getHours().toString().padStart(2, '0'); // Gets the hour in 2-digit format
              const minute = signUpDate.getMinutes().toString().padStart(2, '0'); // Gets the minute in 2-digit format
              const id = 1 + JSON.parse(localStorage.getItem('customers')).length
      
              const customer = {
                ...customerValues, 
                spendingScore:0,
                signUp : `${yearMonthDay}T${hour}:${minute}`,
                id:id
              }

              const storedCustomers = JSON.parse(localStorage.getItem('customers'))

              // Check for duplicate customers
              isDuplicate = storedCustomers.some(
                (c) =>{
                  return c.email === customer.email ||
                  c.telNo === customer.telNo}
              );

              if (!isDuplicate) {
                localStorage.setItem("customers", JSON.stringify([...storedCustomers, customer]));
                showAlert("success", t("common.customerSaved"), t("common.customerSaveSuccess"));
                if (onSubmit) {
                  onSubmit()                
                }
              } else {
                showAlert("error", t("sale.duplicateCustomer"), t("sale.duplicateCustomerDesc"));
              }
            }
          }
          else{
            setIsLoading(false)
            showAlert('error', t('common.invalidInput'), anyError)  
          }
        },50)
    };

    return(
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          zIndex:999
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              width: '70vw',
              height:'fit-content',
              maxHeight:'95%',
              minWidth:600,
              maxWidth:900,
              minHeight:310,
              pt: {xs:1,md:2},
              p:2,
              py:size.y < 500 ? 1 : 2,
              pb:size.y < 500 ? 0 : 2 ,
              borderRadius: 3,
            }}
          >
            <Stack direction='row' justifyContent={'center'} sx={{position:'relative', width:'100%', height:size.y < 500? 35: 50}}>
              <Button variant='contained' onClick={onClose} color='error' sx={{position:'absolute', top:0, left:0}} >
                <ArrowBack fontSize={size.y < 800 ? 'small' : 'medium'} />
              </Button>
              <Typography variant='h6' fontSize={size.y < 500 ? 18 : 20} fontWeight={700} color={'primary'} >
                {t('sale.addCustomer')}
              </Typography>
            </Stack>
            <Divider sx={{width:'100%'}} />

            <Stack direction={'column'} width={'100%'} my={{xs:1, md:2}} gap={{xs:1,md:2}} alignItems={'center'}  sx={{overflowY:'auto', }}>
                <Stack direction={'row'} justifyContent={'space-between'} my={0.5} mt={1} width={'95%'} > 
                  <TextField
                      onChange={(e) => onInputChange(e.target.value)}
                      onFocus={(e) => onFocus(e)}
                      value={customerValues.name}
                      inputRef={(r) => (inputRefs.current.name = r)}
                      label={t('common.customerName')}
                      name='name'
                      variant="filled"
                      required
                      sx={{width:'48%',}}
                      inputMode='text'
                      autoComplete='off'
                  />
                  <TextField
                      onChange={(e) => onInputChange(e.target.value)}
                      onFocus={(e) => onFocus(e)}
                      value={customerValues.surname}
                      inputRef={(r) => (inputRefs.current.surname = r)}
                      label={t('common.customerSurname')}
                      name='surname'
                      inputMode='text'
                      variant="filled"
                      required
                      sx={{width:'48%'}}
                      autoComplete='off'
                  />
                </Stack>

                <Stack direction={'row'} justifyContent={'space-between'} my={0.5} width={'95%'} > 
                  <FormControl variant="filled" sx={{ width: '48%', }}>
                    <InputLabel>{t('common.customerAge')}</InputLabel>
                    <Select
                      value={customerValues.age}
                      onChange={(e) => onInputChange(e.target.value, 'age')}
                      name='age'
                      required
                    >
                          {[...Array(101).keys()].map((age) => (
                            <MenuItem key={age} value={age}>{age}</MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="filled" sx={{ width: '48%', }}>
                    <InputLabel>{t('common.customerGender')}</InputLabel>
                    <Select
                      value={customerValues.gender}
                      onChange={(e) => onInputChange(e.target.value, 'gender')}
                      name='gender'
                      required
                    >
                      <MenuItem value="male">{t('common.male')}</MenuItem>
                      <MenuItem value="female">{t('common.female')}</MenuItem>
                      <MenuItem value="other">{t('common.other')}</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <TextField 
                    onChange={(e) => onInputChange(e.target.value)}
                    onFocus={(e) => onFocus(e)}
                    value={customerValues.telNo}
                    inputRef={(r) => (inputRefs.current.telNo = r)}
                    label={t('common.customerTelNo')} 
                    name='telNo'
                    inputMode='numeric'
                    variant="filled"
                    required
                    sx={{my:0.5, width:'90%'}}
                    autoComplete='off'
                />
                <TextField 
                    onChange={(e) => onInputChange(e.target.value)}
                    onFocus={(e) => onFocus(e)}
                    value={customerValues.email}
                    type='email'
                    inputMode='email'
                    inputRef={(r) => (inputRefs.current.email = r)}
                    label={t('common.customerEmail')} 
                    name='email' 
                    variant="filled"
                    required
                    sx={{my:0.5, width:'90%'}} 
                    autoComplete='off'
                />
                <LoadingButton size='large' variant='contained' color='success' isLoading={isLoading} onClick={handleSubmit}
                  sx={{
                    width:'30%',
                    height:45,
                    maxWidth:200,
                    mx:{xs:1, md:2, my:1}
                  }}
                >
                    {t('common.save')}
                </LoadingButton>
            </Stack>
                
            <Box width={'100%'} height={'fit-content'} flexShrink={0}>
              <Keyboard
              keyboardRef={(r) => (keyboardRef.current = r)}
              layoutName={layout}
              layout={layouts[lang]}
              onChange={onChange}
              onKeyPress={onKeyPress}
              preventMouseDownDefault
              buttonTheme={[
                {
                  class: "hg-red",
                  buttons: "{clear}",
                },
                {
                  class: "hg-blue",
                  buttons: "{arrowleft} {arrowright}",
                },
                {
                  class: mode == 'dark' ? "hg-dark" : "hg-white",
                  buttons:buttons
                },
              ]}
              
              theme={`hg-theme-default ${mode === 'dark' ? 'darkTheme': 'lightTheme'}` }
              display={{
                "{bksp}": t("login.Delete"),
                "{shift}": "Shift",
                "{tab}": "Tab",
                "{lock}": "Caps Lock",
                "{enter}": "Enter",
                "{space}": "Space",
                "{clear}": t("login.clear"),
                "{arrowleft}": "<<",
                "{arrowright}": ">>",
              }}
            />
            </Box>
            <AlertComponent/>
          </Box>
        </Fade>
      </Modal>
    )
  }

export default AddCustomerModal
