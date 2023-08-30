import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { useRequestVerifyAccountMutation } from "../store/usersApiSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/authSlice";

const UserInfo = ({ userInfo }) => {
  const { name, email, verified } = userInfo;
  const [requestVerification] = useRequestVerifyAccountMutation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const resendVerificationEmail = async () => {
    try {
      const res = await requestVerification().unwrap();
      if(res.user) dispatch(setLogin({ ...UserInfo, ...res.user }));
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <Container
      sx={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "fit-content",
          bgcolor: theme.palette.grey[100],
          border: 1,
          borderColor: theme.palette.grey[200],
          borderRadius: 1,
          py: 1,
          px: 4,
        }}
      >
        <Typography sx={{ fontWeight: "bold", mb: 0.6 }}>{name}</Typography>
        <Typography>{email}</Typography>
      </Box>

      {!verified && (
        <Box
          sx={{
            p: 2,
            mt: 2,
            bgcolor: theme.palette.info[100],
            borderRadius: 1,
          }}
        >
          <Typography>
            We sent you a welcome e-mail where you can verify your account.
          </Typography>{" "}
          <Typography >
            Don't see it or verification token has expired?
          </Typography>
          <Button sx={{color: theme.palette.info[500]}} onClick={resendVerificationEmail}>
            Resend verification e-mail
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default UserInfo;
