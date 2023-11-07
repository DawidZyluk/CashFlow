import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from "../../store/accountsApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts, setEntries } from "../../store/authSlice";
import { useGetEntriesQuery } from "../../store/entriesApiSlice";
import toast from "react-hot-toast";

export default function DeleteAccount({ id, name }) {
  const [open, setOpen] = React.useState(false);
  const { data, refetch } = useGetAccountsQuery();
  const {
    data: entries,
    refetch: entriesRefetch,
    isFetching,
  } = useGetEntriesQuery();
  const [deleteAccount] = useDeleteAccountMutation();
  const accounts = useSelector((state) => state.auth.accounts);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);
      refetch();
      entriesRefetch();
      dispatch(setEntries({ entries: entries?.entries }));
      dispatch(setAccounts({ accounts: data?.accounts }));
      setOpen(false);
      toast.success("Account Deleted.")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Try again.")
    }
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <DeleteOutlineIcon sx={{ fontSize: "1.2rem", color: "whitesmoke" }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to delete "{name}" account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible, and all your data will be permanently
            lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(id);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
