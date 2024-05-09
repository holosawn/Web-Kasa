import { Box, Button, Container, Divider, Fade, Grid, Menu, MenuItem, MenuList, Modal, Popper, Stack, TextField, Typography, colors } from '@mui/material'
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { ArrowBack, Preview, WrapText } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { enLayout, trLayout, ruLayout } from "../../LangLayouts/LayoutsWithoutArrows";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useCustomTheme } from '../../contexts/CutomThemeContext';
import buttons from "../../Constants/KeyboardButtons";
import { t } from 'i18next';
import { useLanguage } from '../../contexts/LangContext';
import useSize from '../../CustomHooks/useSize';
import '../../pages/LoginPage/loginKeyboard.css'
import useAlert from '../../CustomHooks/useAlert';
import LoadingButton from '../../ReusableComponents/LoadingButton';
import useFetchData from '../../CustomHooks/useFetchData'
import TextFieldWithMenu from '../../ReusableComponents/TextFieldWithMenu'

// Layouts for keyboard
const layouts = {
    en: enLayout,
    ru: ruLayout,
    tr: trLayout,
  };

const AddCustomerModal=({taggedCustomer, setTaggedCustomer, onDeleteCoupon, activeCoupons, open, onClose})=>{

    const [customers, error, isDataLoading] = useFetchData('Customers')
    const [input, setInput] = useState('')
    // Ref of virtual keyboard
    const keyboardRef = useRef()
    const [layout, setLayout] = useState("default");
    const {lang, setLang} = useLanguage();
    // Ref of textfield input
    const inputRef = useRef()

    const {mode} = useCustomTheme()
    const [size] = useSize()
    const [showAlert, AlertComponent] = useAlert();
    const [isTagLoading, setIsTagLoading] = useState(false);
    const [isDetachLoading, setIsDetachLoading] = useState(false);


    useEffect(()=>{
      const getFullStringOfCustomer=(cus)=>{
        return `${cus.name} ${cus.surname} ${cus.telNo} ${cus.email}`
      }
      const storedTaggedCustomer = JSON.parse(sessionStorage.getItem('taggedCustomer'))
      if (Object.keys(storedTaggedCustomer).length > 0) {
        setInput(getFullStringOfCustomer(storedTaggedCustomer))        
      }
    },[])


    // Sets state and keyboard value on field change
    const onInputChange=(inputVal)=>{
      setInput(inputVal)
      keyboardRef.current.setInput(inputVal)
    }

    function handleShift() {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    }

    // Sets state value on keyboard value change
    const onChange = (input) => {
        setInput(input)
    };

    // Different function on differen virtual keyboard button
    function onKeyPress(button) {
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{clear}") onInputChange("");
        if (button === "{bksp}") customOnBksp();
    }

    const customOnBksp = () => {
        setInput(prev => prev.slice(0, -1))
      };

    // Customers filttered according to input state
    const filteredCustomers = useMemo(() => {
      if (!input) {
        return customers;
      }
      // Return if full string that consists values of customer includes input
      return customers.filter((cus) => {
        const fullInfo = `${cus.name} ${cus.surname} ${cus.telNo} ${cus.email}`;
        const searchTerm = `${input}`.toLowerCase();

        return (
          fullInfo.toLocaleLowerCase().includes(searchTerm)
        );
      });
    }, [input, customers]);

    // For menu of CustomTextFieldWithMenu 
    // extraOnClick will be given in CustomTextFildWithMenu component
    const onMenuItemClick=(cus, extraOnClick)=>{
      extraOnClick(`${cus.name} ${cus.surname} ${cus.telNo}`)
      setTaggedCustomer(cus)
    }

    const onTagCustomerClick=()=>{
      setIsTagLoading(true)
      setTimeout(()=>{
        sessionStorage.setItem('taggedCustomer', JSON.stringify(taggedCustomer))
        setIsTagLoading(false)
        showAlert('success', t('payment.customerTagged'),t('payment.customerTaggedDesc'))
      },1000)
    }

    // Clears input and customer dependent coupons when customer detached
    const onDetachCustomerClick=()=>{
      setIsDetachLoading(true)
      const customerDependentCoupons = activeCoupons.filter(coup => coup.check && coup.check === 'customer')
      customerDependentCoupons.map(coup => {
        onDeleteCoupon(coup)
      })
      setInput('')

      if (Object.keys(taggedCustomer).length  === 0) {
        setTimeout(()=>{
          showAlert('success', t('payment.noTaggedCustomer'),t('payment.noTaggedCustomerDesc'))
          setIsDetachLoading(false)
        },1000)
          
      }
      else{
        setTaggedCustomer({})
        sessionStorage.setItem('taggedCustomer', JSON.stringify({}))
        setTimeout(()=>{
          showAlert('success', t('payment.customerDetached'), t('payment.customerDetachedDesc'))
          setIsDetachLoading(false)
        },1000)

      }
    }

  return isDataLoading || error ? null : (
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
              {t('payment.tagCustomer')}
              </Typography>
            </Stack>
            <Divider sx={{width:'100%'}} />

            <Stack direction={'column'} width={'100%'} my={{xs:1, md:2}} gap={{xs:1,md:2}} alignItems={'center'}  sx={{overflowY:'auto', }}>
                <Stack direction={'row'} justifyContent={'space-between'} my={0.5} px={1} mt={1} width={'100%'} >
                  <TextFieldWithMenu
                    onValueChange={onInputChange}
                    value={ input}
                    inputRef={(r) => (inputRef.current = r)}
                    label={ Object.keys(taggedCustomer).length > 0 ? t('payment.selectedCustomer') : t('payment.searchCus')}
                    onDeleteIconClick={()=>{setTaggedCustomer({})}}
                    name='name'
                    variant="filled"
                    required
                    inputMode='text'
                    menuItemsFunc={(handleMenuItemClick)=>{
                        return filteredCustomers.map((cus) => (
                            <MenuItem key={cus.id} selected={cus.id === taggedCustomer.id} onClick={()=> onMenuItemClick(cus, handleMenuItemClick)} >
                                <Stack direction={'row'} alignItems={'center'} width={'100%'} >
                                    <AccountCircleIcon sx={{mr:1, fontSize:30}}  />
                                    <Stack direction={'column'} >
                                        <Typography>
                                            {cus.name} {cus.surname}
                                        </Typography>
                                        <Typography color={'gray'} >
                                            {cus.email}
                                        </Typography>
                                    </Stack>

                                    <Typography ml={'auto'} >
                                        {cus.telNo}
                                    </Typography>
                                </Stack>
                            </MenuItem>)
                        )
                    }}
                  />

                <LoadingButton size='large'  variant='contained' color='success' onClick={onTagCustomerClick} isLoading={isTagLoading} disabled={!Object.keys(taggedCustomer).length > 0}
                    sx={{
                        width:'20%',
                        height:56,
                        maxWidth:200,
                        ml:{xs:1, md:2},
                        textTransform:'none'
                    }}
                    >
                        {t('payment.tagCustomer')}
                </LoadingButton>

                <LoadingButton size='large'  variant='contained' color='error' onClick={onDetachCustomerClick} isLoading={isDetachLoading} disabled={Object.keys(JSON.parse(sessionStorage.getItem('taggedCustomer')) || {}).length === 0}
                    sx={{
                        width:'20%',
                        height:56,
                        maxWidth:200,
                        ml:{xs:1, md:2},
                        textTransform:'none'
                    }}
                    >
                        {t('payment.detachCustomer')}
                </LoadingButton>
                </Stack>


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
