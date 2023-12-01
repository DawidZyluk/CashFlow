import { Box, Card, IconButton, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../utils/numbers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAccountsQuery } from "../store/accountsApiSlice";
import AddAccount from "../components/Accounts/AddAccount";
import DeleteAccount from "../components/Accounts/DeleteAccount";
import { setAccounts } from "../store/authSlice";

const Accounts = () => {
  const { data, refetch } = useGetAccountsQuery();
  const accounts = useSelector((state) => state.auth.accounts);
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:1210px)");
  const isNonXSmallMobile = useMediaQuery("(min-width:410px)");

  useEffect(() => {
    refetch();
    dispatch(setAccounts({ accounts: data?.accounts }));
  }, [data, accounts])

  return (
    <Box sx={{ mx: isNonMobile ? 17 : 5, my: 5, mb: 10 }}>
      <Typography sx={{ my: 2 }} variant="h4">
        Accounts
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          justifyContent: 'center',
          gridTemplateColumns: isNonXSmallMobile ? "repeat(auto-fill, minmax(340px, 1fr))" : "repeat(auto-fill, minmax(180px, 1fr))",
          gridAutoRows: "9rem",
        }}
      >
        {data?.accounts.map((account) => {
          return (
            <Card
            key={account._id}
              sx={{
                bgcolor: `${account.color}`,
                color: "white",
                p: 2,
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 22, maxWidth: "80%" }}>
                  {account.accountName}
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <AddAccount variant="edit" id={account._id}/>
                  <DeleteAccount id={account._id} name={account.accountName}/>
                </Box>
              </Box>
              <Typography >{account.accountType}</Typography>
              <Typography
                sx={{
                  fontWeight: "light",
                  color: "whitesmoke",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "90%",
                  // mb: 1,
                }}
              >
                {account.accountNumber}
              </Typography>
              <Typography sx={{ fontSize: 20, textAlign: "right", mt: 'auto' }}>
                {currencyFormat(account.balance)}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Accounts;
