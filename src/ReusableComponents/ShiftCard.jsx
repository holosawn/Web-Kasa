import React from "react";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const ShiftCard = ({ name, startTime, inBreak })=>(
    <Box
      m={1}
      mx={2}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
    >
      <AccountCircleIcon sx={{ width: 40, height: 40, color: "#AAC0D7" }} />
      <Box mx={1}>
        <Typography>{name}</Typography>
        <Typography variant="body2" color={"gray"}>
          Start: {startTime}
        </Typography>
      </Box>
      <Typography ml={"auto"} color={"gray"}>
        {inBreak ? "In Break" : "Working"}
      </Typography>
    </Box>
  );

