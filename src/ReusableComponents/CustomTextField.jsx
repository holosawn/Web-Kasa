import {
  Box,
  Button,
  Divider,
  Fade,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SearchIcon} from '../assets/Search.svg';
import { enLayout, trLayout, ruLayout } from "../LangLayouts/LayoutsWithoutArrows";
import { ArrowBack } from '@mui/icons-material'
import LoadingButton from "./LoadingButton";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import buttons from "../Constants/KeyboardButtons";
import { t } from "i18next";
import ClearIcon from '@mui/icons-material/Clear';
import { useCustomTheme } from "../contexts/CutomThemeContext";
import { useLanguage } from "../contexts/LangContext";
import useSize from "../CustomHooks/useSize";

const CustomTextField=({value, setValue, setNumpadFocus, sx, inputProps, ...textFieldProps})=>{
  const [size, setSize] = useSize()
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);    
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // to be opened when keyboard icon clicked
  const openKeyboardModal=()=>{
    setIsKeyboardModalOpen(true)
  }

  const closeKeyboardModal=()=>{
    setIsKeyboardModalOpen(false)
  }

  // It needs to set focus of virtual keyboard to itself on Sale page when focused
  const handleFocus = ()=>{
    if (setNumpadFocus) {
      setNumpadFocus('products')
    }
  }

  return(
    <TextField
        value={value}
        onFocus={handleFocus}
        variant={'outlined'}
        autoComplete="off"
        onChange={handleChange}
        placeholder={t('sale.searchAll')}
        InputProps={{
          sx:{
            fontSize:{xs:12, md:15},
            height:{xs:40, md:55},
            width:'100%'
          },
          startAdornment: (
            <InputAdornment position="start" sx={{display:'flex', justifyContent:'center', alignItems:'center', width:'fit-content'}} >
              <SearchIcon width={size.x > 1000 ? 35 : 15} />
            </InputAdornment>
          ),
          endAdornment:(
            <Stack direction={'row'}>
            <InputAdornment sx={{
              ":hover":{
                cursor:'pointer'
                }
              }} 
              position='end' 
              onClick={openKeyboardModal}
            >
              <KeyboardIcon width={25} sx={{fontSize:{xs:20, md:30}, mr:1}} />
            </InputAdornment>
            <InputAdornment sx={{
                ":hover":{
                  cursor:'pointer'
                }
              }} 
              onClick={()=>{setValue('')}}
              position='end' 
            >
              <ClearIcon width={25} sx={{fontSize:{xs:20, md:30}}} />
            </InputAdornment>
            <KeyboardModal open={isKeyboardModalOpen} onClose={closeKeyboardModal} value={value} setValue={setValue} />
            </Stack>
          ),
          ...inputProps
        }}
        // size={size.y > 400 ? "large": 'small'}
        // sx={sx}
        sx={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          width:'100%',
          backgroundColor:'background.paper',
          mb:{xs:0, md:1},
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            '& fieldset': {
              borderRadius: 2,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "0px",
              transition: 'box-shadow 0.2s ease', // Transition for boxShadow
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border:'0.1px solid #AEAECD',
                boxShadow: '0 0 0 5px #C5C8DC', // Adjust the alpha value (0.5) for transparency
              },
            }
          },
          ...sx
        }}
        {...textFieldProps}
      />
  )
}

const KeyboardModal = ({open, onClose, value, setValue})=>{
    const [input, setInput] = useState(value) 
    const [loading, setLoading] = useState(false)
    const {mode} = useCustomTheme()
    const keyboardRef = useRef()
    const [layout, setLayout] = useState("default");
    const {lang, setLang} = useLanguage();
    const inputRef = useRef()
    const [size] = useSize()

    // Set coming value(value of origin textfield) to current textfield
    useEffect(()=>{
      if (open && keyboardRef.current) {
        onInputChange(value)
      }
    },[open, keyboardRef.current])

    const onSaveButtonClick=()=>{
      setLoading(true)
      setValue(input)
      setLoading(false)
        setTimeout(()=>{
          onClose()
        },20)
    }
  
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

    return(
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
                {t('common.search')}
              </Typography>
              
            </Stack>
            <Divider sx={{width:'100%'}} />
            <Stack direction='row' justifyContent={'center'} alignItems={'center'} sx={{my:size.y < 500 ?  1: 3, minWidth:450, width:'100%', position:'relative'}} >
                {/* <Typography variant='h6' fontSize={size.y< 500 ? 16: 18} noWrap sx={{width:90, position:'absolute', left:'2%'}} > 
                {t('payment.email')}:
                </Typography> */}
                <SearchIcon  fontSize={size.y< 500 ? 16: 18} style={{position:'absolute', left:'3%'}}/>

                <TextField type='email' value={input} autoFocus onChange={e => onInputChange(e.target.value)} inputRef={inputRef} sx={{
                    width:{xs:'70%', lg:'75%'},
                    ml:size.x < 1100 ? -7: size.x < 1200 ? -9:-7,
                    minWidth:350,
                    maxWidth:'80%',
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent the default behavior of Enter key
                          onSaveButtonClick(); // Call the function to mimic the click behavior
                      }
                    }}
                  />
                  <LoadingButton isLoading={loading} disabled={loading} variant='contained' onClick={onSaveButtonClick} sx={{width: size.x < 1000 ? 70 :size.x < 1200 ? 85 : 100, position:'absolute', right:'2%', height:'90%'}} >
                    {t('common.save')}
                  </LoadingButton>
            </Stack>
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
            {/* <AlertComponent/> */}
          </Box>
        </Fade>
      </Modal>
    )
  }

  const layouts = {
    en: enLayout,
    ru: ruLayout,
    tr: trLayout,
  };

export default CustomTextField;
