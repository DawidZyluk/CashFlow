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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setEntries } from "../../store/authSlice";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";
import { useAddEntryMutation } from "../../store/entriesApiSlice";
import { categories } from "./categories";

dayjs.extend(utc);
dayjs.extend(timezone);
const localTimezone = dayjs.tz.guess();
dayjs.tz.setDefault(localTimezone);

export default function AddEntry() {
  const [open, setOpen] = React.useState(false);
  const [addEntry, { error }] = useAddEntryMutation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.auth.entries);
  const accounts = useSelector((state) => state.auth.accounts);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [date, setDate] = useState(dayjs());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await addEntry({ ...values, date: date.format() }).unwrap();
      dispatch(setEntries({ entries: [...entries, res] }));
      onSubmitProps.resetForm();
      setDate(dayjs());
      setOpen(false);
      toast.success("Entry Created!");
    } catch (err) {
      toast.error("Can't add an account. Try again.");
      console.log(err);
    }
  };

  const entrySchema = yup.object().shape({
    date: yup
      .date()
      .default(() => dayjs())
      .required("Required"),
    value: yup.number().required("Required"),
    accountId: yup.string().min(1).required("Required"),
    category: yup.string().min(1).required("Required"),
    note: yup.string(),
  });

  const initialValues = {
    date: date,
    value: "",
    accountId: "",
    category: "",
    note: "",
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ height: "100%" }}
        onClick={handleClickOpen}
      >
        + Add Entry
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ ml: 1 }}>Entry Details</DialogTitle>
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
                mb: 2,
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
            validationSchema={entrySchema}
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
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en-gb"
                  >
                    <DatePicker
                      name="date"
                      label="Date"
                      id="date"
                      autoComplete="date"
                      onBlur={handleBlur}
                      onChange={(value) => setDate(value)}
                      value={date}
                      error={Boolean(touched.date) && Boolean(errors.date)}
                      helperText={touched.date && errors.date}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </LocalizationProvider>
                  <TextField
                    name="value"
                    type="number"
                    label="Value"
                    id="value"
                    autoComplete="value"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.value}
                    error={Boolean(touched.value) && Boolean(errors.value)}
                    helperText={touched.value && errors.value}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                    <InputLabel
                      id="accountId"
                      sx={{
                        color:
                          (Boolean(touched.accountId) &&
                            Boolean(errors.accountId)) &&
                          "error.main",
                      }}
                    >
                      Account
                    </InputLabel>
                    <Select
                      fullWidth
                      name="accountId"
                      label="Account Id"
                      id="accountId"
                      autoComplete="accountId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.accountId}
                      error={
                        Boolean(touched.accountId) && Boolean(errors.accountId)
                      }
                    >
                      {accounts.map((account) => (
                        <MenuItem key={account._id} value={account._id}>
                          {account.accountName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "error.main" }}>
                      {touched.accountId && errors.accountId}
                    </FormHelperText>
                  </FormControl>
                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                    <InputLabel
                      id="category"
                      sx={{
                        color:
                          (Boolean(touched.accountId) &&
                            Boolean(errors.accountId)) &&
                          "error.main",
                      }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      fullWidth
                      name="category"
                      label="Category"
                      id="category"
                      autoComplete="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                      error={
                        Boolean(touched.category) && Boolean(errors.category)
                      }
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "error.main" }}>
                      {touched.accountId && errors.accountId}
                    </FormHelperText>
                  </FormControl>
                  <TextField
                    name="note"
                    label="Note"
                    id="note"
                    autoComplete="note"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.note}
                    error={Boolean(touched.note) && Boolean(errors.note)}
                    helperText={touched.note && errors.note}
                    sx={{ gridColumn: "span 4" }}
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
                    Add Entry
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
