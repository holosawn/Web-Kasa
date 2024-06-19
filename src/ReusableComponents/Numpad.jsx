import {
Button,
Grid,
Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { t } from "i18next";
  
  // Renders a numpad with given key layout.
  // SetValue gets callback function and it will be passed into key
  // scrollRef can be used for buttons with scroll functionality
  // layout can be passed or default will be used
const Numpad = ({ setValue, scrollRef, layout }) => {
  const scrollIntervalRef = useRef(null);

  const defaultLayout = [
    {
      name: "1",
    },
    {
      name: "2",
    },
    {
      name: "3",
    },
    {
      name: "Scroll Up",
      onClick:()=>{},
      onMouseDown: ()=> startScroll(-7),
      onMouseUp:()=> stopScroll(),
      color: "warning",
    },
    {
      name: "4",
    },
    {
      name: "5",
    },
    {
      name: "6",
    },
    {
      name: "Scroll Down",
      onClick:()=>{},
      onMouseDown: ()=> startScroll(7),
      onMouseUp:()=> stopScroll(),
      color: "warning",
    },
    {
      name: "7",
    },
    {
      name: "8",
    },
    {
      name: "9",
    },
    {
      name: t('sale.delete'),
      onClick: (setVal) =>
        setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -1);
          else return prev
        }),
      color: "warning",
    },
    {
      name: "0",
    },
    {
      name: "Space",
      onClick: (setVal) => setVal((prev) => prev + ' '),
    },
    {
      name: "00",
    },
    {
      name: t('sale.clear'),
      onClick: (setVal) =>
        setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -prev.length);
          else return prev
        }),
      color: "warning",
    },
  ];

  const scroll = (scrollVal) => {
    if(scrollRef){
      const currPos = scrollRef.current.scrollTop;
      scrollRef.current.scrollTo({ left: 0, top: currPos + scrollVal, behavior: 'auto' });
    }
  };

  const startScroll = (scrollVal) => {
    if(scrollIntervalRef.current === null){
      scrollIntervalRef.current = setInterval(() => {
        scroll(scrollVal);
      }, 1);
    }
  };

  const stopScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null
  };

  // const largeLayout = (layout || defaultLayout).length > 15 

  return(
    <Grid
    container
    width={{ xs: 300, md: 400, lg: 430, xl: 550 }}
    height={{xs: 150 ,md: 170 , lg: 240 , xl: 260 , }}
    mb={{ md: 0.5 }}
   >
    {(layout || defaultLayout).map((content) => (
        <Grid item xs={3} key={content.name} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Key
              content={content.name}
              onClick={content.onClick && (() => content.onClick(setValue))}
              onMouseDown={content.onMouseDown ? content.onMouseDown : null}
              onMouseUp={content.onMouseUp ? content.onMouseUp : null}
              setValue={setValue}
              color={content.color ? content.color : "primary"}
          />
        </Grid>
    ))}
    </Grid>
)};

// SetValue will get callback function as parameter. It will give prev values of state
const Key = ({ content, sx, onClick, onMouseUp, onMouseDown, setValue, color, ...props }) => {

  // If there is a given onClick function it will execute it otherwise it will ad current content into state
    function handleClick(event, content) {
      event.preventDefault();
      if (onClick) {
        onClick();
      } else {
        setValue((prevValue) => {
          return (prevValue ? prevValue + content : content)});
      }
    }

    function handleOnMouseDown(e){
      if(onMouseDown) onMouseDown();
      e.preventDefault()
    }

    function handleOnMouseUp(e){
      if(onMouseUp) onMouseUp();
    }
  
    return (
      <Button
        display={"flex"}
        onClick={(e) => handleClick(e, content)}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        variant="contained"
        color={color}
        sx={{
          width:{xs:60,md:75, lg:85, xl:100},
          minWidth: 25,
          // maxWidth:180,
          height: {xs:35,md:40, lg:55, xl:60},
          // minHeight: 60,
          // maxHeight:120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          border: "1px solid gray",
          m: {xs:0.1, md:0.3},
          ...sx,
        }}
        {...props}
      >
        <KeyContent content={content}/>
      </Button>
    );
  };

  // Icons for some buttons
  const KeyContent = ({content}) => {
    switch (content) {
      case 'Delete':
        return <BackspaceIcon sx={{ fontSize: { xs: 16, md: 20, xl:30 } }} />;
      case 'Scroll Up':
        return <KeyboardArrowUp sx={{ fontSize: { xs: 20, md: 25, xl:35 } }} />;
      case 'Scroll Down':
        return <KeyboardArrowDown sx={{ fontSize: { xs: 20, md: 25, xl:35 } }} />;
      default:
        return <Typography textTransform={"none"} fontSize={{ xs: 10, md: 13, xl:18 }} lineHeight={1.2}>{content}</Typography>;
    }
  };
    
  export default Numpad;