import { Button, Typography } from "@mui/material";
import React from "react";

const AccountButon = ({account}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        mr: 1.5,
        width: '9rem',
        color: 'white',
        bgcolor: account.color,
        "&:hover": {
          bgcolor: `${account.color}DD`
        }
      }}
      key={account._id}
    >
      <Typography>{account.accountName}</Typography>
      <Typography>${account.balance.toFixed(2)}</Typography>
    </Button>
  );
};

export default AccountButon;
