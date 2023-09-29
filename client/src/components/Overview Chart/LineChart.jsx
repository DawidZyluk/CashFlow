import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetEntriesQuery } from "../../store/entriesApiSlice";
import { useMemo, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import dayjs from "dayjs";
import { groupByDate } from "./sortingFunctions";
import useDialog from "../../hooks/useDialog";
import YearPicker from "./YearPicker";
import MonthPicker from "./MonthPicker";

export const LineChart = () => {
  const { data } = useGetEntriesQuery();
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");

  const entriesState = useMemo(() => {
    if (!data)
      return [
        {
          id: "Overall",
          color: "hsl(23, 70%, 50%)",
          data: [],
        },
      ];

    return groupByDate(data.entries);
  });

  return (
    <Card sx={{ p: 2, my: 1, height: "500px" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ my: 0 }} variant="h5">
          Overview Chart
        </Typography>
        <FiberManualRecordIcon
          sx={{ fontSize: 12, color: "lightgray", mx: 1 }}
        />
        <YearPicker year={year} setMonth={setMonth} setYear={setYear} />
        {year !== "All" && (
          <>
            <FiberManualRecordIcon
              sx={{ fontSize: 12, color: "lightgray", mx: 1 }}
            />
            <MonthPicker month={month} setMonth={setMonth} />
          </>
        )}
      </Box>
      <ResponsiveLine
        data={entriesState}
        margin={{ top: 50, right: 90, bottom: 70, left: 60 }}
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
            return dayjs(date).format("DD/MM");
          },
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "value",
          legendOffset: -55,
          legendPosition: "middle",
        }}
        //colors={{ scheme: "nivo" }}
        pointSize={8}
        pointColor="white"
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor", modifiers: [] }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Card>
  );
};
