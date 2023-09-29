import { Box, Card, Typography } from "@mui/material";
import React from "react";
import useDialog from "../../hooks/useDialog";

const MonthPicker = ({ month, setMonth }) => {
  const [ref, isDialogOpen, setIsDialogOpen] = useDialog(false);

  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (month) => {
    setMonth(month);
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ position: "relative" }} ref={ref}>
      <Typography
        variant="h5"
        onClick={() => setIsDialogOpen(true)}
        sx={{
          //width: 60,
          textAlign: "center",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {month}
      </Typography>
      {isDialogOpen && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            left: -10,
            //right: 0,
            // ml: "auto",
            // mr: "auto",
          }}
        >
          <Card sx={{}}>
            {months.map((month) => (
              <Typography
                key={month}
                sx={{
                  px: 1.3,
                  py: 0.3,
                  "&:hover": {
                    cursor: "pointer",
                    bgcolor: "lightgrey",
                  },
                }}
                onClick={() => handleMonthChange(month)}
              >
                {month}
              </Typography>
            ))}
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default MonthPicker;
