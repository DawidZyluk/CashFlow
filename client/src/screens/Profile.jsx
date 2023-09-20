import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { toast } from "react-hot-toast";
import { Card } from "@mui/material";
import { useUpdateMutation } from "../store/usersApiSlice";
import { setLogin } from "../store/authSlice";

const registerSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .oneOf([yup.ref("confirmPassword"), null], "Passwords must match"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function Profile() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [update, { error }] = useUpdateMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const initialValues = {
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await update(values).unwrap();
      dispatch(setLogin({...userInfo, ...res }));
      toast.success("Profile Updated!");
    } catch (err) {
      //console.log(err?.data?.message || err.error);
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
          Update profile
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
          validationSchema={registerSchema}
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
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
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
                Update
              </Button>
            </Box>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
