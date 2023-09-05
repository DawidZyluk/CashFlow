import { Button, Card, Typography } from "@mui/material";
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
  const accounts = useSelector((state) => state.auth.accounts)

  useEffect(() => {
    refetch();
    dispatch(setAccounts({ ...data }));
  }, [data, accounts]);

  return (
    <Card sx={{ my: 1, p: 1, display: "flex" }}>
      {data?.accounts.map((account) => {
        return (
          <AccountButon account={account}/>
        );
      })}
      <AddAccount />
    </Card>
  );
};

export default AccountsList;
