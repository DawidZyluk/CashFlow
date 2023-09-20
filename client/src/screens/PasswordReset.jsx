import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import * as yup from "yup";
import { useResetPasswordMutation } from "../store/usersApiSlice";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast } from "react-hot-toast";

const resetSchema = yup.object().shape({
  password: yup.string().required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function RequestReset() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()


  const [resetPassword, { error }] = useResetPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const {password, confirmPassword} = values
      const token = searchParams.get("token");
      const userId = searchParams.get("id");
      await resetPassword({password, confirmPassword, token, userId}).unwrap();
      navigate("/login")
      toast.success("Password have been changed!");
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card
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
        <Typography sx={{ mb: 2 }} component="h1" variant="h5">
          Reset your password
        </Typography>
        {error && (
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              textAlign: "center",
              py: 1,
              borderColor: theme.palette.error.light,
              backgroundColor: theme.palette.error[50],
            }}
          >
            <Typography sx={{ color: theme.palette.error.main }}>
              {error?.data?.message || "Something went wrong. Try again"}
            </Typography>
          </Card>
        )}
        <Formik
          validateOnBlur={false}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={resetSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
          }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1,}}
            >
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !isValid}
              >
                Change password
              </Button>
            </Box>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
