import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as yup from "yup";
import { GithubPicker } from "react-color";
import {
  Box,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAddAccountMutation } from "../../store/accountsApiSlice";
import { useTheme } from "@emotion/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "../../store/authSlice";
import { useState } from "react";
import useDialog from "../../hooks/useDialog";
import { adjustFontColor } from "../../utils/adjustFontColor";

export default function AddAccount() {
  const [open, setOpen] = useState(false);
  const [ ref, isDialogOpen, setIsDialogOpen ] = useDialog(false);
  const [color, setColor] = useState("#0b8043");
  const [addAccount, { error }] = useAddAccountMutation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.auth.accounts);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const colors = [
    "#d50000",
    "#e67c73",
    "#f4511e",
    "#f6bf26",
    "#33b679",
    "#0b8043",
    "#039be5",
    "#3f51b5",
    "#7986cb",
    "#8e24aa",
    "#616161",
  ];


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsDialogOpen(false);
    setColor("#0b8043")
  };

  const handleColorChangeComplete = (color) => {
    setColor(color.hex);
    setIsDialogOpen(false);
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await addAccount({...values, color}).unwrap();
      dispatch(setAccounts({ accounts: [...accounts, res] }));
      onSubmitProps.resetForm();
      setOpen(false);
      toast.success("Account Created!");
    } catch (err) {
      toast.error("Can't add an account. Try again.");
      console.log(err);
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
    balance: 0,
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ height: "100%", width: "9rem" }}
        onClick={handleClickOpen}
      >
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
              <>
                <Box
                  sx={{
                    pt: 1,
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                  component="form"
                  display="grid"
                  gap="1rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <TextField
                    sx={{ gridColumn: "span 2" }}
                    fullWidth
                    id="accountName"
                    label="Account Name"
                    name="accountName"
                    autoComplete="accountName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountName}
                    error={
                      Boolean(touched.accountName) &&
                      Boolean(errors.accountName)
                    }
                    helperText={touched.accountName && errors.accountName}
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      height: "56px",
                      color: "white",
                      gridColumn: "span 2",
                      bgcolor: color,
                      //justifyContent: 'flex-start',
                      "&:hover": {
                        backgroundColor: color,
                      },
                    }}
                    onClick={() => setIsDialogOpen(!isDialogOpen)}
                  >
                    Color
                  </Button>
                  <Box
                    ref={ref}
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      top: "130px",
                      right: "40px",
                    }}
                  >
                    {isDialogOpen && (
                      <GithubPicker
                        colors={colors}
                        onChangeComplete={(color) =>
                          handleColorChangeComplete(color)
                        }
                      />
                    )}
                  </Box>

                  <TextField
                    sx={{ gridColumn: "span 4" }}
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
                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
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
                    sx={{ gridColumn: "span 2" }}
                    fullWidth
                    id="balance"
                    label="Initial Balance"
                    type="number"
                    name="balance"
                    autoComplete="balance"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.balance}
                    error={Boolean(touched.balance) && Boolean(errors.balance)}
                    helperText={touched.balance && errors.balance}
                  />
                </Box>
                <DialogActions
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isValid}
                  >
                    Add Account
                  </Button>
                </DialogActions>
              </>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
