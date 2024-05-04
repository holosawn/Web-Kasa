import { Box, Button, Container, Divider, Fade, Grid, Menu, MenuItem, MenuList, Modal, Popper, Stack, TextField, Typography, colors } from '@mui/material'
import React, { useCallback, useMemo, useRef, useState } from 'react'
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
import CustomTextFieldWithMenu from '../../ReusableComponents/CustomTextfieldWithMenu';

const layouts = {
    en: enLayout,
    ru: ruLayout,
    tr: trLayout,
  };


const AddCustomerModal=({taggedCustomer, setTaggedCustomer, onDeleteCoupon, activeCoupons, open, onClose})=>{
    const [customers, error, isDataLoading] = useFetchData('Customers')
    const [input, setInput] = useState('')
    const keyboardRef = useRef()
    const [layout, setLayout] = useState("default");
    const {lang, setLang} = useLanguage();
    const inputRef = useRef()

    const {mode} = useCustomTheme()
    const [size] = useSize()
    const [showAlert, AlertComponent] = useAlert();
    const [isTagLoading, setIsTagLoading] = useState(false);
    const [isDetachLoading, setIsDetachLoading] = useState(false);


    const onInputChange=(inputVal)=>{
        setInput(inputVal)
        keyboardRef.current.setInput(inputVal)
      }

      function handleShift() {
          const newLayoutName = layout === "default" ? "shift" : "default";
          setLayout(newLayoutName);
      }

      const onChange = (input) => {
          setInput(input)
      };

      function onKeyPress(button) {
          if (button === "{shift}" || button === "{lock}") handleShift();
          if (button === "{clear}") onInputChange("");
          if (button === "{bksp}") customOnBksp();
      }

      const customOnBksp = () => {
          setInput(prev => prev.slice(0, -1))
        };

    const filteredCustomers = useMemo(() => {
        if (!input) {
          return customers;
        }

        return customers.filter((cus) => {
          const fullInfo = `${cus.name} ${cus.surname} ${cus.telNo} ${cus.email}`;
          const searchTerm = `${input}`.toLowerCase();

          return (
            // cus.name.toLowerCase().includes(searchTerm) ||
            // cus.surname.toLowerCase().includes(searchTerm) ||
            // cus.telNo.toLowerCase().includes(searchTerm) ||
            // cus.email.toLowerCase().includes(searchTerm) ||
            // fullName.toLowerCase().includes(searchTerm) ||
            // (fullName.toLowerCase() + ' ' + cus.telNo.toLowerCase()).includes(searchTerm)

            fullInfo.toLocaleLowerCase().includes(searchTerm)
          );
        });
      }, [input, customers]);

      const onMenuItemClick=(cus, extraOnClick)=>{
        extraOnClick(`${cus.name} ${cus.surname} ${cus.telNo}`)
        setTaggedCustomer(cus)
      }

      const onTagCustomerClick=()=>{
        setIsTagLoading(true)
        setTimeout(()=>{
          sessionStorage.setItem('taggedCustomer', JSON.stringify(taggedCustomer))
          showAlert('success', 'Customer Tagged', 'Customer tagged succesfully')
          setIsTagLoading(false)
        },1000)
      }

      const onDetachCustomerClick=()=>{
        setIsDetachLoading(true)
        const customerDependentCoupons = activeCoupons.filter(coup => coup.check && coup.check === 'customer')
        customerDependentCoupons.map(coup => {
          onDeleteCoupon(coup)
        })
        setInput('')

        if (Object.keys(taggedCustomer).length  === 0) {
          setTimeout(()=>{
            showAlert('success', 'No Customer', 'There are no customer detached')
            setIsDetachLoading(false)
          },1000)
            
        }
        else{
          setTaggedCustomer({})
          sessionStorage.setItem('taggedCustomer', JSON.stringify({}))
          setTimeout(()=>{
            showAlert('success', 'Customer detached', 'Customer detached succesfully')
            setIsDetachLoading(false)
          },1000)
  
        }
      }

      return isDataLoading? (
        <Container>
            <Typography>Loading</Typography>
        </Container>
    )
    : error ? (
        <Container>
            <Typography>{error}</Typography>
        </Container>
    )
    : (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
        //   zIndex:999
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
              {t('payment.tagCustomer')}
              </Typography>
            </Stack>
            <Divider sx={{width:'100%'}} />

            <Stack direction={'column'} width={'100%'} my={{xs:1, md:2}} gap={{xs:1,md:2}} alignItems={'center'}  sx={{overflowY:'auto', }}>
                <Stack direction={'row'} justifyContent={'space-between'} my={0.5} px={1} mt={1} width={'100%'} >
                  <CustomTextFieldWithMenu
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
                        {/* Tag Customer */}
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
