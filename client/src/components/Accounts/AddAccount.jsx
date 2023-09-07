import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useAddAccountMutation } from "../../store/accountsApiSlice";
import { useTheme } from "@emotion/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "../../store/authSlice";

export default function AddAccount() {
  const [open, setOpen] = React.useState(false);
  const [addAccount, { error }] = useAddAccountMutation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.auth.accounts)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await addAccount(values).unwrap();
      dispatch(setAccounts({accounts: [ ...accounts, res ]}));
      onSubmitProps.resetForm();
      setOpen(false);
      toast.success("Account Created!");
    } catch (err) {
      toast.error("Can't add an account. Try again.")
      console.log(err)
    }
  };

  const accountSchema = yup.object().shape({
    accountName: yup.string().min(1).required("Required"),
    accountNumber: yup.string().min(1),
    accountType: yup.string().min(1).required("Required"),
    balance: yup.number().required("Required"),
  });

  const initialValues = {
    accountName: "",
    accountNumber: "",
    accountType: "cash",
    balance: "",
  };

  return (
    <div>
      <Button variant="outlined" sx={{height: '100%', width: '9rem'}} onClick={handleClickOpen}>
        + Add Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ ml: 1, mb: -1.5 }}>Account Details</DialogTitle>
        <DialogContent>
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
            validationSchema={accountSchema}
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
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  fullWidth
                  id="accountName"
                  label="Account Name"
                  name="accountName"
                  autoComplete="accountName"
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountName}
                  error={Boolean(touched.accountName) && Boolean(errors.accountName)}
                  helperText={touched.accountName && errors.accountName}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="accountNumber"
                  label="Account Number (optional)"
                  id="accountNumber"
                  autoComplete="accountNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountNumber}
                  error={
                    Boolean(touched.accountNumber) &&
                    Boolean(errors.accountNumber)
                  }
                  helperText={touched.accountNumber && errors.accountNumber}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel
                    id="accountType"
                    // sx={{
                    //   color:
                    //     (Boolean(touched.accountNumber) ||
                    //       Boolean(errors.accountNumber)) &&
                    //     "error.main",
                    // }}
                  >
                    Account Type
                  </InputLabel>
                  <Select
                    fullWidth
                    name="accountType"
                    label="Account Type"
                    id="accountType"
                    autoComplete="accountType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountType}
                    error={
                      Boolean(touched.accountType) &&
                      Boolean(errors.accountType)
                    }
                  >
                    <MenuItem value="main">Main</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="credit card">Credit Card</MenuItem>
                    <MenuItem value="debit card">Debit Card</MenuItem>
                    <MenuItem value="savings">Savings</MenuItem>
                    <MenuItem value="investment">Investment</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: "error.main" }}>
                    {touched.accountType && errors.accountType}
                  </FormHelperText>
                </FormControl>
                <TextField
                  margin="normal"
                  fullWidth
                  id="balance"
                  label="Initial Balance"
                  type="number"
                  name="balance"
                  autoComplete="balance"
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.balance}
                  error={
                    Boolean(touched.balance) &&
                    Boolean(errors.balance)
                  }
                  helperText={touched.balance && errors.balance}
                />

                <DialogActions sx={{display: 'flex', alignItems: 'center'}}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || !isValid}
                  >
                    Add Account
                  </Button>
                </DialogActions>
              </Box>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
