import { Box, Card, Typography } from "@mui/material";
import React from "react";
import useDialog from "../../hooks/useDialog";

const YearPicker = ({ year, setMonth, setYear }) => {
  const [yearRef, isYearDialogOpen, setIsYearDialogOpen] = useDialog(false);

  const years = ["All", 2023, 2022, 2021, 2020];

  const handleYearChange = (year) => {
    if(year === "All") setMonth("All")
    setYear(year);
    setIsYearDialogOpen(false);
  };

  return (
    <Box sx={{ position: "relative" }} ref={yearRef}>
      <Typography
        variant="h5"
        onClick={() => setIsYearDialogOpen(true)}
        sx={{
          //width: 60,
          textAlign: "center",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {year}
      </Typography>
      {isYearDialogOpen && (
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
          <Card
            sx={{

            }}
          >
            {years.map((year) => (
              <Typography
                key={year}
                sx={{
                  px: 1.3,
                  py: 0.3,
                  "&:hover": {
                    cursor: "pointer",
                    bgcolor: "lightgrey",
                  },
                }}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </Typography>
            ))}
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default YearPicker;
