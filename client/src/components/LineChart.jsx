import { Card, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetEntriesQuery } from "../store/entriesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEntries } from "../store/authSlice";
import dayjs from "dayjs";

const dummyData = [
  {
    id: "japan",
    color: "hsl(23, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 9,
      },
      {
        x: "helicopter",
        y: 298,
      },
      {
        x: "boat",
        y: 190,
      },
      {
        x: "train",
        y: 38,
      },
      {
        x: "subway",
        y: 176,
      },
      {
        x: "bus",
        y: 244,
      },
      {
        x: "car",
        y: 107,
      },
      {
        x: "moto",
        y: 82,
      },
      {
        x: "bicycle",
        y: 211,
      },
      {
        x: "horse",
        y: 203,
      },
      {
        x: "skateboard",
        y: 103,
      },
      {
        x: "others",
        y: 104,
      },
    ],
  },
];

export const LineChart = () => {
  const { data, refetch } = useGetEntriesQuery();
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.auth.entries);
  const [entriesState, setEntriesState] = useState({});

  useEffect(() => {
    refetch();
    let sortedEntries;
    let groupedEntries = [];
    if (data) {
      sortedEntries = [...data.entries];
      sortedEntries.sort(function (a, b) {
        return new Date(b.date) + new Date(a.date);
      });

      for (let entry of sortedEntries) {
        const key = entry.date.split("T")[0];
        if (!groupedEntries[key]) {
          groupedEntries[key] = {
            total: entry.value,
            entries: [entry],
          };
        } else {
          groupedEntries[key].total += entry.value;
          groupedEntries[key].entries.push(entry);
        }
      }

      groupedEntries = Object.keys(groupedEntries).map((date) => {
        return {
          x: date,
          y: groupedEntries[date].total,
        };
      });
    }
    setEntriesState([
      {
        id: "Overall",
        color: "hsl(23, 70%, 50%)",
        data: groupedEntries,
      },
    ]);
    dispatch(setEntries({ entries: data?.entries }));
  }, [data, entries]);

  return (
    <Card sx={{ p: 2, my: 1, height: "500px" }}>
      <Typography sx={{ my: 0 }} variant="h5">
        Overview Chart
      </Typography>
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
        colors={{ scheme: "nivo" }}
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
