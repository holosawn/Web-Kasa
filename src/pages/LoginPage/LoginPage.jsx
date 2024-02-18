import { Box, Button,  IconButton,  InputAdornment,  Link, MenuItem, Select, TextField, Typography, } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/Logo.png'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import './loginKeyboard.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DisplayErrorMessage from '../../PageComponents/LoginPage/DisplayErrorMessage';
import { t } from 'i18next';
import { useLanguage } from '../../contexts/LangContext';
import { enLayout, trLayout, ruLayout } from '../../LangLayouts/Layouts';


const LoginPage = () => {
    const [ loginValues, setLoginValues] = useState({
        'userCode':"",
        'password':""
    });
    const [layout, setLayout] = useState("default");
    const [errors, setErrors] = useState({
        'userCode':'Usercode cannot be empty',
        'password':"Password is too short"
    });
    const [touched, setTouched] = useState({
        'userCode':false,
        'password':false
    });
    const keyboard = useRef();
    const inputRefs = useRef([{
        'userCode': useRef(),
        'password': useRef()
    }])
    const [caretPos, setCaretPos] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [lang, setLang] = useLanguage();

    const user = {'userCode' : 'admin', 'password': '123'}

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const moveCursorLeft = (value) => {
        const inputElement = inputRefs.current[keyboard.current.inputName];
        inputElement.selectionStart = Math.max(0, inputElement.selectionStart + value);
        inputElement.selectionEnd = inputElement.selectionStart;
        inputElement.focus();
    };

    const handleShift = () => {
      const newLayoutName = layout === "default" ? "shift" : "default";
      setLayout(newLayoutName);
    };

    const onKeyPress = button => {
        if (button === '{shift}' || button === '{lock}') handleShift();
        if (button === '{clear}') onChangeInput('');
        if (button === '{bksp}') customOnBksp();
        if (button === '{arrowleft}') moveCursorLeft(-1);
        if (button === '{arrowright}') moveCursorLeft(+1);
    };

    const customOnBksp = ()=>{
        const inputName = keyboard.current.inputName
        const newValue = loginValues[inputName].slice(0, -1);
        onChange(newValue)
    };

    const onChangeInput = input => {
        const inputName = keyboard.current.inputName;
        const initLoginValues = { ...loginValues, [inputName]: input }
        setLoginValues({ ...loginValues, [inputName]: input })
        validateValues(initLoginValues);
        keyboard.current.setInput(input);
    };

    const onFocus = event => {
        const inputName = event.target.name
        keyboard.current.setInput(loginValues[inputName])
        keyboard.current.inputName = inputName
        setTouched(prev => ({ ...prev, [inputName]: true }));
    }

    const onChange = input => {
        const inputName = keyboard.current.inputName;
        const initLoginValues = { ...loginValues, [inputName]: input }
        setLoginValues({ ...loginValues, [inputName]: input })
        validateValues(initLoginValues);
        setCaretPos(keyboard.current.caretPosition);
    };

    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.userCode.trim() === '') {
          errors.userCode = 'Usercode cannot be empty';
        }
        if (inputValues.password.length < 3) {
          errors.password = "Password is too short";
        }
        setErrors(errors)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const allFieldsTouched = Object.values(touched).every((value) => value === true);
        const anyErrors = Object.values(errors).some((value) => value === true);
        if (!anyErrors ) {
            if (loginValues.userCode === user.userCode && loginValues.password === user.password) {
                console.log('user authorized');
            }
        }
    };

    const customlayout= {
        'default': [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp} {clear}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . / {shift}',
          '.com @ {space} {arrowleft} {arrowright}'
        ],
        'shift': [
          '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp} {clear}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M &lt; &gt; ? {shift}',
          '.com @ {space} {arrowleft} {arrowright}'
        ]
    }

    const setInputCaretPosition = (elem, pos) => {
        if (elem.setSelectionRange) {
          elem.focus();
          elem.setSelectionRange(pos, pos);
        }
    };

    const handleLangChange = (lang)=>{
        setLang(lang);
    }

    useEffect(()=>{
        const inputName = keyboard.current.inputName
        if (inputName) {
            if (caretPos !== null) setInputCaretPosition(inputRefs.current[inputName], caretPos);
        }
    },[caretPos])

    const layouts = {
        'en': enLayout,
        'ru': ruLayout,
        'tr': trLayout
    }


  return (
    <Box alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{
        backgroundColor:'#E3E3E3',
        width:'100vw',
        height:'100vh',
        display:'flex',
        minWidth:667,
        minHeight:375,
    }}
    >
        <Box sx={{
            backgroundColor:'white',
            display:'flex',
            width:'65%',
            height:'50%',
            borderRadius:5,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Box sx={{
                width:'35%',
                height:'100%',
                backgroundColor:'#02B9B8',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                position:'relative'
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <img src={logo} style={{
                        width:200,
                        marginBottom:5
                    }}/>
                    <Typography>
                        {t('login.app')}
                    </Typography>
                </Box>
                <Typography sx={{
                position:'absolute',
                bottom:10,
                left:10
                }}>
                    v.1.3.45.688
                </Typography>
            </Box>
            <Box sx={{
                width:'65%',
                height:'100%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                position:'relative'
            }}>
                <Typography color={'#027F7E'} sx={{
                    fontSize:25,
                    fontWeight:'bold'
                }}>
                    {t('login.Welcome')}
                </Typography>
                    <TextField 
                    onChange={(e)=> onChangeInput(e.target.value)}
                    onFocus={e => onFocus(e)}
                    value={loginValues.userCode}
                    inputRef={r=> (inputRefs.current.userCode = r)}
                    autoComplete='off'
                    variant='filled'
                    required
                    id="userCode"
                    label={t('login.userCode')}
                    name="userCode"
                    size='medium'
                    sx={{
                        color:'#ad2118',
                        outlineColor:'#ad2118',
                        marginTop:3,
                        marginBottom:2,
                        width:'50%'
                    }}
                    />
                    <TextField 
                    onChange={(e)=> onChangeInput(e.target.value)} 
                    onFocus={e => onFocus(e)}
                    value={loginValues.password}
                    inputRef={r=> (inputRefs.current.password = r)}
                    type={showPassword ? "text" : "password"} 
                    variant='filled'
                    required
                    id="password"
                    label={t('login.password')}
                    name="password"
                    size='medium'
                    sx={{
                        width:'50%',
                        marginBottom:2
                    }}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Box sx={{
                        width:'50%',
                        mb:2,
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems:'flex-end'
                    }}>
                        <DisplayErrorMessage errorMsg={errors} touched={touched} />
                        
                        <Select
                        sx={{ml:'auto'}}
                        defaultValue='en'
                        size='small'
                        onChange={e => handleLangChange(e.target.value)}
                        >
                            <MenuItem value={'tr'}>Türkçe</MenuItem>
                            <MenuItem value={'en'}>English</MenuItem>
                        </Select>
                    </Box>
                    <Button
                    variant='contained' 
                    onClick={handleSubmit}
                    sx={{
                        width:'50%',
                        height:50,
                        backgroundColor: '#18A4AD',
                    }}
                    >
                        {t('login.LogIn')}
                    </Button>

                    <Typography
                    fontWeight={700}
                    color={'#027F7E'}  
                    sx={{
                        position:'absolute',
                        top:15,
                        right:15
                    }}
                    >
                        10/12/2023
                    </Typography>
            </Box>
        </Box>
        <Box sx={{
            width:'65%',
        }}>
            <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                layoutName={layout}
                layout={layouts[lang]}
                onChange={onChange}
                onKeyPress={onKeyPress}
                preventMouseDownDefault
                buttonTheme={[
                    {
                        class:'hg-red',
                        buttons:"{clear}"
                    },
                    {
                        class:'hg-blue',
                        buttons:'{arrowleft} {arrowright}'
                    }
                ]}
                display={{
                    '{bksp}': t('login.Delete'),
                    '{shift}': 'Shift',
                    '{tab}': 'Tab',
                    '{lock}': 'Caps Lock',
                    '{enter}': 'Enter',
                    '{space}': 'Space',
                    '{clear}': t('login.clear'),
                    '{arrowleft}': '<<',
                    '{arrowright}': '>>'
                  }}
            />
            <Typography sx={{
                display:'flex',
                flexDirection:'row'
            }}>
                {t('login.support')} : <Typography sx={{marginLeft:1}} >None@gmail.com.tr</Typography>
            </Typography>
        </Box>
    </Box>
  )
}

export default LoginPage
