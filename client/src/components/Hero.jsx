import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Hero() {
  const { userInfo } = useSelector((state) => state.auth);
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        my: 10,
        mx: 15,
        textAlign: "center",
        padding: 2,
        [theme.breakpoints.down("md")]: {
          mx: 0,
        },
        [theme.breakpoints.down("sm")]: {
          my: 5,
        },
      }}
    >
      <CardContent>
        <Typography variant="h3" fontWeight={300} my={1}>
          Welcome to CashFlow
        </Typography>
        <Typography mt={3}>
          Discover financial empowerment with CashFlow - your ultimate companion
          in achieving your savings goals. Say goodbye to financial uncertainty
          and hello to organized, stress-free savings management.
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: 1,
        }}
      >
        {!userInfo && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              size="medium"
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/register"
              size="medium"
              sx={{
                backgroundColor: theme.palette.primary[400],
                "&:hover": {
                  backgroundColor: theme.palette.primary[500],
                },
              }}
            >
              Register
            </Button>
          </Stack>
        )}
      </CardActions>
    </Card>
  );
}
