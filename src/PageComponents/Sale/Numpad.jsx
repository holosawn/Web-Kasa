import {
Button,
Grid,
Typography,
} from "@mui/material";
import React, { useRef } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const defaultLayout = [
    {
      name: "Cash Sale",
      onClick: (setVal) => console.log("Cash Sale clicked"),
      color: "success",
    },
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
      onClick: (setVal) => console.log("Refund clicked"),
      color: "warning",
    },
    {
      name: "Card Sale",
      onClick: (setVal) => console.log("Card Sale clicked"),
      color: "success",
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
      onClick: (setVal) => console.log("Refund clicked"),
      color: "warning",
    },
    {
      name: "See All",
      onClick: (setVal) => console.log("50 clicked"),
      color: "success",
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
      name: "Delete",
      onClick: (setVal) =>
        setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -1);
          else return prev
        }),
      color: "warning",
    },
    {
      name: "Drawer Amount",
      onClick: (setVal) => console.log("Drawer Opened"),
      color: "success",
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
      name: "Clear",
      onClick: (setVal) =>
        setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -prev.length);
          else return prev
        }),
      color: "warning",
    },
  ];
  
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

const Key = ({ content, sx, onClick, onMouseUp, onMouseDown, setValue, color, ...props }) => {
    function handleClick(event, content) {
      event.preventDefault();
      if (onClick) {
        onClick(content);
      } else {
        setValue((prevValue) => {
          console.log(prevValue);
          console.log(typeof prevValue);
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
          width:{xs:60,md:75, lg:90, xl:110},
          minWidth: 25,
          // maxWidth:180,
          height: {xs:35,md:45, lg:60, xl:75},
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
  
const Numpad = ({ setValue, scrollRef=null, layout=defaultLayout }) => {
  const scrollIntervalRef = useRef(null);

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

  return(
    <Grid container width={{xs:300,md:400,lg:500, xl:600}} height={{xs:140, md:190,lg:270, xl:320}} mb={{md:0.5}}  >
    {layout.map((content) => (
        <Grid item xs={12 / 5} key={content.name} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Key
            content={content.name}
            onClick={content.name === 'Scroll Up' ? () => {} : content.name === 'Scroll Down' ? () => {} : content.onClick && (() => content.onClick(setValue))}
            onMouseDown={content.name === 'Scroll Up' ? () => startScroll(-7) : content.name === 'Scroll Down' ? () => startScroll(7) : null}
            onMouseUp={content.name === 'Scroll Up' || content.name === 'Scroll Down' ? stopScroll : null}
            setValue={setValue}
            color={content.color ? content.color : "primary"}
        />
        </Grid>
    ))}
    </Grid>
)};

  export default Numpad;