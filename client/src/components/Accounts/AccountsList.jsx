import { Box, Button, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AddAccount from "./AddAccount";
import { useGetAccountsQuery } from "../../store/accountsApiSlice";
import { setAccounts } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import AccountButon from "./AccountButon";

const AccountsList = () => {
  const { data, refetch } = useGetAccountsQuery();
  const dispatch = useDispatch();
  const theme = useTheme();
  const accounts = useSelector((state) => state.auth.accounts);

  useEffect(() => {
    refetch();
    dispatch(setAccounts({ ...data }));
  }, [data, accounts]);

  return (
    <Card sx={{ p: 2, my: 1 }}>
      <Typography sx={{ my: 0 }} variant="h5">
        Accounts
      </Typography>
      <Box sx={{ display: "flex", mt: 2 }}>
        {data?.accounts.map((account) => (
          <AccountButon key={account._id} account={account} />
        ))}
        <AddAccount />
      </Box>
    </Card>
  );
};

export default AccountsList;
