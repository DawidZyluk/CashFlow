import { Button, Typography } from "@mui/material";
import React from "react";

const AccountButon = ({ account }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        color: "white",
        py: .5,
        px: 1,
        bgcolor: account.color,
        height: '100%',
        "&:hover": {
          bgcolor: `${account.color}DD`,
        },
      }}
      key={account._id}
    >
      <Typography
        sx={{
          width: '95%',
          overflow: 'hidden',
          textAlign: "left",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {account.accountName}
      </Typography>
      <Typography>${account.balance.toFixed(2)}</Typography>
    </Button>
  );
};

export default AccountButon;
