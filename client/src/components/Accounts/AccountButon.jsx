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
        mx: 1,
      }}
      key={account._id}
    >
      <Typography>{account.accountName}</Typography>
      <Typography>${account.balance.toFixed(2)}</Typography>
    </Button>
  );
};

export default AccountButon;
