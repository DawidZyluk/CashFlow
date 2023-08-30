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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/authSlice";
import { useRequestVerifyAccountMutation } from "../store/usersApiSlice";

const Verification = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const [requestVerification] = useRequestVerifyAccountMutation();

  const resendVerificationEmail = async () => {
    try {
      const res = await requestVerification().unwrap();
      if (res.user) dispatch(setLogin({ ...UserInfo, ...res.user }));
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Container>
      <Collapse in={isOpen}>
        <Accordion sx={{ pr: 3, background: theme.palette.info[100] }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
              <InfoOutlinedIcon
                sx={{ mr: 1, color: theme.palette.info[400] }}
              />
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
            <Typography>
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
      <p>ebe ebe</p>
    </Container>
  );
};

export default Verification;
