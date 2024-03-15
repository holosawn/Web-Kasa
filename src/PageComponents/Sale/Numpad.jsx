import {
Button,
Grid,
Typography,
} from "@mui/material";
import React from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

const contents = [
    {
      name: "10",
      onClick: (setVal) => console.log("10 clicked"),
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
      name: "Delete",
      onClick: (setVal) =>
        setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -1);
          else return prev
        }),
      color: "warning",
    },
    {
      name: "20",
      onClick: (setVal) => console.log("10 clicked"),
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
      name: "Clear",
      onClick: (setVal) =>
        setVal((prev) => {
          if (prev && prev.length > 0) return prev.slice(0, -prev.length);
          else return prev
        }),
      color: "warning",
    },
    {
      name: "50",
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
      name: "Card Sale",
      onClick: (setVal) => console.log("Refund clicked"),
      color: "warning",
    },
    {
      name: "100",
      onClick: (setVal) => console.log("100 clicked"),
      color: "success",
    },
    {
      name: "0",
    },
    {
      name: "Space",
      onClick: (setVal) => setVal((prev) => prev + " "),
    },
    {
      name: "00",
    },
    {
      name: "Open Drawer",
      onClick: (setVal) => console.log("Open Drawer clicked"),
      color: "warning",
    },
  ];
  

const Key = ({ content, sx, onClick, setValue, color, ...props }) => {
    function handleClick(event, content) {
      event.preventDefault();
      if (onClick) {
        onClick(content);
      } else {
        setValue((prevValue) => (prevValue ? prevValue + content : content));
      }
    }
  
    return (
      <Button
        display={"flex"}
        onClick={(e) => handleClick(e, content)}
        onMouseDown={(e) => e.preventDefault()}
        variant="contained"
        color={color}
        sx={{
          width: 120,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          border: "1px solid gray",
          m: 0.5,
          ...sx,
        }}
        {...props}
      >
        {content === "Delete" ? (
          <BackspaceIcon />
        ) : (
          <Typography textTransform={"none"}>{content}</Typography>
        )}
      </Button>
    );
};
  
const Numpad = ({ setValue }) => {
  return(
    <Grid container flex={1} >
    {contents.map((content) => (
        <Grid item xs={12 / 5} key={content.name}>
        <Key
            content={content.name}
            onClick={content.onClick && (() => content.onClick(setValue))}
            setValue={setValue}
            color={content.color ? content.color : "primary"}
        />
        </Grid>
    ))}
    </Grid>
)};

  export default Numpad;