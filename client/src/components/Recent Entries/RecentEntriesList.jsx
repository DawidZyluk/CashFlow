import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Card, Typography, useMediaQuery } from "@mui/material";
import AddEntry from "./AddEntry";
import {
  useDeleteEntryMutation,
  useGetEntriesQuery,
} from "../../store/entriesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setEntries } from "../../store/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { categories } from "./categories";
import dayjs from "dayjs";
import NoRowsOverlay from "./NoRowsOverlay";
import { currencyFormat } from "../../utils/numbers";

export default function RecentEntries() {
  const { data, refetch, isFetching } = useGetEntriesQuery();
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.auth.entries);
  const accounts = useSelector((state) => state.auth.accounts);
  const [deleteEntry] = useDeleteEntryMutation();
  const isNonLaptopL = useMediaQuery("(min-width:1640px)");
  const isNonMobile = useMediaQuery("(min-width:1200px)");

  const handleDelete = async (id) => {
    try {
      await deleteEntry(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
    dispatch(setEntries({ entries: data?.entries }));
    //console.log(data?.entries[0]);
  }, [data, entries, accounts]);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 0.8,
      minWidth: 100,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "accountId",
      headerName: "Account",
      flex: 0.8,
      minWidth: 100,
      align: "left",
      headerAlign: "left",
      type: "singleSelect",
      valueOptions: accounts?.map((obj) => obj.accountName),
      valueGetter: (params) => params.value?.accountName,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.8,
      minWidth: 100,
      type: "singleSelect",
      valueOptions: categories?.map((obj) => obj.name),
    },
    {
      field: "value",
      headerName: "Value",
      type: "number",
      flex: 0.6,
      minWidth: 100,
      align: "left",
      headerAlign: "left",
      valueFormatter: (params) => currencyFormat(params.value),
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      minWidth: 100,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD/MM/YYYY, HH:mm"),
    },
    {
      field: "updatedAt",
      headerName: "Updated at",
      flex: 1,
      minWidth: 100,
      valueFormatter: (params) =>
        dayjs(params.value).format("DD/MM/YYYY, HH:mm"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.8,
      minWidth: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <AddEntry variant="edit" id={id} />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            role="button"
            label="Delete"
            onClick={() => {
              handleDelete(id);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Card
      sx={{
        p: 2,
        gridColumn: isNonLaptopL ? "span 4" : "span 6",
        gridRow: "span 4",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ my: 0 }} variant="h5">
          Recent Entries
        </Typography>
        <AddEntry />
      </Box>
      <Box
        role="grid"
        sx={{
          mt: 2,
          height: 450,
          width: "100%",

          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          rows={entries || []}
          columns={columns}
          slots={{
            // toolbar: EditToolbar,
            noRowsOverlay: NoRowsOverlay,
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: {
              sortModel: [{ field: "updatedAt", sort: "desc" }],
            },
          }}
          pageSizeOptions={[10, 15, 25, 50]}
          loading={isFetching}
        />
      </Box>
    </Card>
  );
}
