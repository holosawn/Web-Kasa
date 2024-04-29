import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
  Stack,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../LoginPage/loginKeyboard.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DisplayErrorMessage from "../../PageComponents/LoginPage/DisplayErrorMessage";
import LangSelector from "../../PageComponents/LoginPage/LangSelector";
import { t } from "i18next";
import { useLanguage } from "../../contexts/LangContext";
import { enLayout, trLayout, ruLayout } from "../../LangLayouts/LayoutsWithArrows";
import { useCustomTheme } from "../../contexts/CutomThemeContext";
import { useTheme } from "@emotion/react";
import useFetchData from "../../CustomHooks/useFetchData";
import buttons from "../../Constants/KeyboardButtons";
import { useNavigate } from "react-router-dom";
import useSize from '../../CustomHooks/useSize';
import LoadingButton from "../../ReusableComponents/LoadingButton";

const layouts = {
  en: enLayout,
  ru: ruLayout,
  tr: trLayout,
};

const user = { userCode: "admin", password: "123" };
const currentDate= new Date();

const setInputCaretPosition = (elem, pos) => {
  if (elem.setSelectionRange) {
    elem.focus();
    elem.setSelectionRange(pos, pos);
  }
};

const validateLoginValues = (loginValues, setErrors) => {
  const errors = {};
  if (loginValues.userCode.trim() === "") {
    errors.userCode = true;
  }
  if (loginValues.password.length < 3) {
    errors.password = true;
  }
  setErrors(errors);
};

const LoginPage = () => {
  const [loginValues, setLoginValues] = useState({
    userCode: "",
    password: "",
  });
  const [layout, setLayout] = useState("default");
  const [errors, setErrors] = useState({
    userCode: true,
    password: true,
    submit:''
  });
  const [touched, setTouched] = useState({
    userCode: false,
    password: false,
  });
  const keyboard = useRef();
  const inputRefs = useRef([
    {
      userCode: useRef(),
      password: useRef(),
    },
  ]);
  const [caretPos, setCaretPos] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState();
  const {lang, setLang} = useLanguage();
  const navigate = useNavigate();
  const {data, error, isLoading} = useFetchData('/Login')
  const { mode } = useCustomTheme();
  const theme = useTheme();
  const [size] = useSize();

  const isMedium = useMediaQuery('(max-height:800px)')

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword() {
    setShowPassword(!showPassword);
  }

  function moveCaret(value) {
    const inputElement = inputRefs.current[keyboard.current.inputName];
    if (inputElement) {
      inputElement.selectionStart = Math.max(
        0,
        inputElement.selectionStart + value
      );
      inputElement.selectionEnd = inputElement.selectionStart;
      inputElement.focus();
    }
  }

  function handleShift() {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  }

  function onKeyPress(button) {
    if (button === "{shift}" || button === "{lock}") handleShift();
    if (button === "{clear}") onChangeInput("");
    if (button === "{bksp}") customOnBksp();
    if (button === "{arrowleft}") moveCaret(-1);
    if (button === "{arrowright}") moveCaret(+1);
  }

  const customOnBksp = () => {
    const inputName = keyboard.current.inputName;
    if (inputName) {
      const newValue = loginValues[inputName].slice(0, -1);
      onChange(newValue);
    }
  };

  const onChangeInput = (input) => {
    const inputName = keyboard.current.inputName;
    const initLoginValues = { ...loginValues, [inputName]: input };

    setLoginValues({ ...loginValues, [inputName]: input });
    validateLoginValues(initLoginValues, setErrors);
    keyboard.current.setInput(input);
  };

  const onFocus = (event) => {
    const inputName = event.target.name;
    keyboard.current.setInput(loginValues[inputName]);
    keyboard.current.inputName = inputName;
    if(touched[inputName] !== true) setTouched((prev) => ({ ...prev, [inputName]: true }));
  };

  const onChange = (input) => {
    const inputName = keyboard.current.inputName;
    const initLoginValues = { ...loginValues, [inputName]: input };
    setLoginValues({ ...loginValues, [inputName]: input });
    validateLoginValues(initLoginValues, setErrors);
    setCaretPos(keyboard.current.caretPosition);
    if(errors.submit !== '') setErrors(prev => ({...prev, submit:true}))
    if(touched.submit !== false) setTouched(prev => ({...prev, submit:false}))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(prev => ({...prev, submit:true}))
    const anyErrors = Object.values(errors).some((value) => value !== "");
    if (!anyErrors) {
      setIsButtonLoading(true)
      if (
        loginValues.userCode === user.userCode &&
        loginValues.password === user.password
      ) {
        setIsButtonLoading(false)
        navigate('/Menu')
      }
      else{
        setErrors(prev => ({...prev, submit:true}))
        setIsButtonLoading(false)
      }
    }
  };

  // const handleLangChange = (lang) => {
  //   setLang(lang);
  // };

  useEffect(() => {
    if (!isLoading) { 
      const inputName = keyboard.current.inputName;
      if (inputName) {
        if (caretPos !== null)
          setInputCaretPosition(inputRefs.current[inputName], caretPos);
      }
    }
  }, [caretPos]);

  return (
    <Paper
      sx={{
        width:'100vw',
        height:'100vh',
        minWidth:665,
        minHeight:375,
        display: "flex",  
        flexDirection: "column",
        alignItems: "center",
        justifyContent: {xs: "start" , md:'center'},
        backgroundColor:'background.secondary',
        position:{xs:'relative', md:'static'}
      }}
    >
      {error && <Typography>{error}</Typography>}
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && 
      <>
        <Box  mt={0} width={{xs: '100%', md:"65%"}} height={{xs :"60%", md: '50%'}} sx={{position:'relative', overflowY:'auto'}} >
          <Box
            sx={{
              display: "flex",
              width: '100%',
              height: '100%',
              borderRadius: {xs:0 , md: 5},
              mt:0,
              flexDirection: "column",
              justifyContent: 'start',
              alignItems: "center",
              // position: {xs:'static', md:"relative"},
              overflowY:'auto',
              backgroundColor:'background.paper',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              color={'primary.main'}
              position={'sticky'}
              variant={'h4' }
              mt={1}
              sx={{
                fontSize: {xs:20, sm:25, md:30, l:43,},
                fontWeight: "bold",
              }}
            >
              {t("login.Welcome")}
            </Typography>

            <TextField
              onChange={(e) => onChangeInput(e.target.value)}
              onFocus={(e) => onFocus(e)}
              value={loginValues.userCode}
              inputRef={(r) => (inputRefs.current.userCode = r)}
              autoComplete="off"
              variant="filled"
              required
              id="userCode"
              label={t("login.userCode")}
              name="userCode"
              size={isMedium ? 'small' : "medium"}
              sx={{
                marginTop: {xs: 1,lg:3},
                marginBottom: {xs: 1, md:2},
                width: "50%",
                color: "text.primary",
              }}
            />
            <TextField
              onChange={(e) => onChangeInput(e.target.value)}
              onFocus={(e) => onFocus(e)}
              value={loginValues.password}
              inputRef={(r) => (inputRefs.current.password = r)}
              type={showPassword ? "text" : "password"}
              variant="filled"
              required
              id="password"
              label={t("login.password")}
              name="password"
              size={isMedium ? 'small' : "medium"}
              sx={{
                width: "50%",
                marginBottom: {xs: 1, md:2},
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
                ),
              }}
            />
            <Box
              sx={{
                width: "50%",
                mb: {xs:1 , lg: 2},
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <DisplayErrorMessage errorMsg={errors} touched={touched} />

              <LangSelector
              //  handleChange={handleLangChange}
                />
            </Box>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              isLoading={isButtonLoading}
              disabled={Object.values(errors).some((value) => value !== "")}
              sx={{
                width: "50%",
                height: {xs: 25, sm:35 ,md:40, lg:50},
                mb:1
              }}
            >
              {t("login.LogIn")}
            </LoadingButton>

            <Typography
              fontWeight={700}
              sx={{
                position: "absolute",
                top: 15,
                right: 15,
              }}
            >
              {`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}
            </Typography>
            <Typography
              fontWeight={700}
              sx={{
                position: "absolute",
                bottom: 10,
                left: 15,
              }}
            >
              {data.version}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: {xs: '100%', md:"65%"},
          }}
        >
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
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
          {!isMedium &&<Typography
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {t("login.support")} : None@gmail.com.tr
          </Typography>}
        </Box>
      </>
      }
    </Paper>
  );
};

export default LoginPage;