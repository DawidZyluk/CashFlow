import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

import { useEffect, useMemo, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import dayjs from "dayjs";
import {
  calculateBalance,
  formatData,
  getData,
  sortStats,
} from "./sortingFunctions";
import YearPicker from "./YearPicker";
import MonthPicker from "./MonthPicker";
import { useGetStatsQuery } from "../../store/statsApiSlice";
import StepPicker from "./StepPicker";
import { useTheme } from "@emotion/react";

export const LineChart = () => {
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");
  const [isStepOpen, setIsStepOpen] = useState(false);
  const [step, setStep] = useState(1);
  const theme = useTheme();

  const { data } = useGetStatsQuery();
  let availableYears = [];
  let chartData = [];
  let areaBaseline = 0;
  let chartWidth = 0;
  let newStep = 4;

  if (data) {
    const [mergedDays, sortedStats] = sortStats(data.stats);

    const years = sortedStats.map((stat) => stat.year);
    availableYears = years;

    if (year !== "All" && month !== "All") {
      let sum = calculateBalance(sortedStats, year, month);
      const monthData = getData(sortedStats, year, month);
      areaBaseline = sum + monthData[0][1];
      chartData = formatData(monthData, sum);
    } else if (year !== "All") {
      let sum = calculateBalance(sortedStats, year, month);
      const yearData = getData(sortedStats, year, month);
      areaBaseline = sum + yearData[0][1];
      chartData = formatData(yearData, sum, step);
      if (chartData.length > 30 && !isStepOpen) {
        newStep = Math.ceil(chartData.length / 25);
        chartData = formatData(yearData, sum, newStep);
      }
      chartWidth = chartData.length * 40;
    } else {
      let sum = 0;
      areaBaseline = sum;
      chartData = formatData(Object.entries(mergedDays), sum, step);
      if (chartData.length > 30 && !isStepOpen) {
        newStep = Math.ceil(chartData.length / 25);
        chartData = formatData(Object.entries(mergedDays), sum, newStep);
      }
      chartWidth = chartData.length * 40;
    }
  }

  const chartState = useMemo(() => {
    if (!data)
      return [
        {
          id: "Overall",
          color: theme.palette.gold[300],
          data: [],
        },
      ];

    return [
      {
        id: "Overall",
        color: theme.palette.gold[400],
        data: chartData,
      },
    ];
  });

  const handleIsStepOpenChange = () => {
    setIsStepOpen(!isStepOpen);
    setStep(1);
  };

  return (
    <Card sx={{ p: 2, my: 1, height: "500px" }}>
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Typography sx={{ my: 0 }} variant="h5">
          Overview Chart
        </Typography>
        <FiberManualRecordIcon
          sx={{ fontSize: 12, color: "lightgray", mx: 1 }}
        />
        <YearPicker
          availableYears={availableYears}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
        />
        {year !== "All" && (
          <>
            <FiberManualRecordIcon
              sx={{ fontSize: 12, color: "lightgray", mx: 1 }}
            />
            <MonthPicker month={month} setMonth={setMonth} />
          </>
        )}
        {(year === "All" || month === "All") && (
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              width: "fit-content",
              flexDirection: "row",
              border: 1,
              borderRadius: 100,
              // position: "relative",
              // right: 50,
            }}
          >
            <Box
              sx={{
                borderRadius: 100,
                borderTopRightRadius: isStepOpen && 0,
                borderBottomRightRadius: isStepOpen && 0,
                borderRight: isStepOpen && 1,
                px: 3,
                py: 0.4,
                pr: 2.6,
                bgcolor: theme.palette.grey[100],
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={handleIsStepOpenChange}
            >
              <Typography sx={{}}>
                {isStepOpen ? "Close" : "Set step"}
              </Typography>
            </Box>
            {isStepOpen && <StepPicker step={step} setStep={setStep} />}
          </Box>
        )}
      </Box>
      <Box sx={{ height: "450px", overflowX: "auto" }}>
        <Box
          sx={{
            height: "400px",
            width: chartWidth,
            minWidth: 1040,
            position: "relative",
          }}
        >
          <ResponsiveLine
            data={chartState}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 30, left: 150 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (date) => {
                return dayjs(date, "DD/MM/YYYY").format("DD/MM");
              },
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              //legend: "date",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              //legend: "value",
              legendOffset: -60,
              legendPosition: "middle",
            }}
            pointSize={8}
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor", modifiers: [] }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={areaBaseline}
            useMesh={true}
          />
        </Box>
      </Box>
    </Card>
  );
};
