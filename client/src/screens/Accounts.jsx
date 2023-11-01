import { Box, Card, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { currencyFormat } from "../utils/numbers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAccountsQuery } from "../store/accountsApiSlice";

const Accounts = () => {
  const { data, refetch } = useGetAccountsQuery();
  const accounts = useSelector((state) => state.auth.accounts);
  return (
    <Box sx={{ mx: 17, my: 5, mb: 10 }}>
      <Typography sx={{ my: 2 }} variant="h4">
        Accounts
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: "repeat(4, 1fr)",
          // gridAutoRows: "10rem",
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
                <Box sx={{}}>
                  <IconButton size="small">
                    <EditIcon
                      sx={{ fontSize: "1.2rem", color: "whitesmoke" }}
                    />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteOutlineIcon
                      sx={{ fontSize: "1.2rem", color: "whitesmoke" }}
                    />
                  </IconButton>
                </Box>
              </Box>
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
              <Typography >{account.accountType}</Typography>
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
