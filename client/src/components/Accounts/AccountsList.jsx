import {
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import AddAccount from "./AddAccount";
import { useGetAccountsQuery } from "../../store/accountsApiSlice";
import { setAccounts } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountButon from "./AccountButon";
import NoAccounts from "./NoAccounts";

const AccountsList = () => {
  const { data, refetch, isFetching } = useGetAccountsQuery();
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.auth.accounts);
  const isNonLaptopL = useMediaQuery("(min-width:1640px)");
  const isNonSmallMobile = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    refetch();
    dispatch(setAccounts({ ...data }));
  }, [data, accounts]);

  let sortedAccounts = [];
  if (data) {
    sortedAccounts = [...data.accounts].sort((a, b) => b.balance - a.balance);
  }

  return (
    <Card
      sx={{
        gridColumn: isNonSmallMobile
          ? isNonLaptopL
            ? "span 2"
            : "1 / 4"
          : "span 6",
        gridRow: "1 / 3",
        // gridRow: "span 4",
        p: 2,
        // my: 1,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          zIndex: 10,
          top: 60,
          height: 10,
          width: "98%",
          boxShadow: "inset 0px 15px 8px -11px white",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          zIndex: 10,
          bottom: 15,
          height: 10,
          width: "98%",
          boxShadow: "inset 0px -15px 8px -11px white",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Accounts</Typography>
        <AddAccount />
      </Box>
      {!isFetching ? (
        <Box
          sx={{
            mt: 1,
            maxHeight: "185px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            MsOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {data?.accounts.length ? (
            <Box
              sx={{
                py: 1,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr));",
                gridAutoRows: "60px",
                rowGap: 1,
                columnGap: 1,
              }}
            >
              {sortedAccounts.map((account) => (
                <AccountButon key={account._id} account={account} />
              ))}
            </Box>
          ) : (
            <NoAccounts />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

export default AccountsList;
