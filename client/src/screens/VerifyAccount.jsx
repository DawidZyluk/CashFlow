import React, { useEffect, useState } from "react";
import {
  useRequestVerifyAccountMutation,
  useVerifyAccountMutation,
} from "../store/usersApiSlice";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/authSlice";

const VerifyAccount = () => {
  const [verifyUser] = useVerifyAccountMutation();
  const [requestVerification] = useRequestVerifyAccountMutation();
  const [result, setResult] = useState("Loading...");
  const [errorStatus, setErrorStatus] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyUser({ token, userId }).unwrap();
        dispatch(setLogin({...userInfo, ...res.user}));
        setResult(res.message);
      } catch (error) {
        if(error.status === 401) setResult("You have to be logged in to verify your e-mail");
        else setResult(error.data.message);
        setErrorStatus(error.status);
      }
    };
    verify();
  }, []);

  const resendVerificationEmail = async () => {
    try {
      const res = await requestVerification().unwrap();
      toast.success(res.message);
    } catch (error) {
      if(error.status == 401) toast.error("You have to be logged in");
      else toast.error(error.data.message);
      
    }
  };

  return (
    <Container
      sx={{
        width: "40rem",
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <>
          <Typography variant="h5">
            {result || "Something went wrong. Try again"}
          </Typography>
          {errorStatus == 400 && (
            <Button onClick={resendVerificationEmail}>
              Send another e-mail
            </Button>
          )}
          {errorStatus == 401 && (
            <Button component={Link} to="/login">
              Login
            </Button>
          )}
        </>
      </Box>
    </Container>
  );
};

export default VerifyAccount;
