import { useTheme } from "@emotion/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/authSlice";
import { useRequestVerifyAccountMutation } from "../store/usersApiSlice";

const Verification = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const [requestVerification] = useRequestVerifyAccountMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const isNonLaptopL = useMediaQuery("(min-width:1640px)");
  const isNonSmallMobile = useMediaQuery("(min-width:910px)");

  const resendVerificationEmail = async () => {
    try {
      const res = await requestVerification().unwrap();
      if (res.user) dispatch(setLogin({ ...userInfo, ...res.user }));
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Collapse
      in={isOpen}
      sx={{
        pt: 0.3,
        my: 2
      }}
    >
      <Accordion sx={{ pr: 3, background: theme.palette.info[100] }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <InfoOutlinedIcon sx={{ mr: 1, color: theme.palette.info[400] }} />
            <Typography sx={{ color: theme.palette.info[700] }}>
              E-mail Verification
            </Typography>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              sx={{ ml: "auto", position: "relative", left: "50px" }}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 0,
            pb: 2,
          }}
        >
          <Typography sx={{textAlign: 'center'}}>
            We sent you a welcome e-mail where you can verify your account.
            Don't see it or verification token has expired?
          </Typography>{" "}
          <Typography></Typography>
          <Button
            sx={{
              color: theme.palette.info[500],
              background: "inherit",
              "&:hover": {
                background: theme.palette.info[50],
              },
            }}
            onClick={resendVerificationEmail}
          >
            Resend verification e-mail
          </Button>
        </AccordionDetails>
      </Accordion>
    </Collapse>
  );
};

export default Verification;
