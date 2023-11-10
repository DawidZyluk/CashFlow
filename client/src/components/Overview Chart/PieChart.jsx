import {
  Box,
  Card,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { useGetStatsQuery } from "../../store/statsApiSlice";
import { sortStats } from "./sortingFunctions";
import { useEffect, useState } from "react";
import { useGetAccountsQuery } from "../../store/accountsApiSlice";
import { useTheme } from "@emotion/react";
import { currencyFormat } from "../../utils/numbers";

export const PieChart = () => {
  const { data: stats, refetch, isFetching } = useGetAccountsQuery();
  const [accountInfo, setAccountInfo] = useState({});
  const theme = useTheme();
  const isNonLaptopL = useMediaQuery("(min-width:1640px)");
  const isNonMobile = useMediaQuery("(min-width:1200px)");
  const isNonSmallMobile = useMediaQuery("(min-width:910px)");
  const isNonXSmallMobile = useMediaQuery("(min-width:480px)");
  const isNotBetweenMobileAndSmall = isNonMobile == isNonSmallMobile;
  // const hasHorizontalSpace = ((isNotBetweenMobileAndSmall << 1) + +isNonXSmallMobile);
  const hasHorizontalSpace = (isNotBetweenMobileAndSmall && isNonXSmallMobile);

  let totalBalance = 0;
  let formatedData = [];

  if (stats) {
    totalBalance = stats.accounts.reduce((acc, curr) => acc + curr.balance, 0);

    formatedData = stats.accounts.reduce((filtered, account) => {
      if (account.balance > 0)
        filtered.push({
          id: `${account.accountName}${Math.random()}`,
          label: account.accountName,
          value: account.balance.toFixed(2),
          color: account.color,
        });
      return filtered;
    }, []);
  }

  formatedData.sort((a, b) => b.value - a.value);

  useEffect(() => {
    setAccountInfo({ ...formatedData[0] });
    refetch();
  }, [stats]);

  const tooltip = ({ datum }) => {
    return (
      <Card
        variant="outlined"
        sx={{
          bgcolor: "white",
          px: 1.2,
          py: 0.7,
          position: "fixed",
          zIndex: 1000,
          width: "fit-content",
          bottom: 20,
          right: -60,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.7 }}>
          <Box
            sx={{
              height: 15,
              width: 15,
              bgcolor: datum.color,
              mr: 1,
              borderRadius: "2px",
            }}
          ></Box>
          <Typography noWrap>{datum.label}</Typography>
        </Box>
        <Typography>${datum.value}</Typography>
        <Typography>
          {((datum.value / totalBalance) * 100).toFixed(2)}%
        </Typography>
      </Card>
    );
  };

  const mouseEnterHandler = (data) => {
    setAccountInfo(data);
  };

  return (
    <Card
      sx={{
        gridColumn: isNonSmallMobile ? (isNonLaptopL ? "span 2" : "4/ 7") : ("span 6"),
        gridRow: isNonSmallMobile ? (isNonLaptopL ? "span 4" : "1 / 5") : '5 / 9',
        overflow: "visible",
        p: 2,
      }}
    >
      <Typography sx={{ my: 0 }} variant="h5">
        Balance Structure
      </Typography>
      <Typography>Total balance: {currencyFormat(totalBalance)}</Typography>

      <Box
        sx={{
          width: "100%",
          height: "90%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // mt: 2
        }}
      >
        {!isFetching ? (
          <>
            {formatedData[0] ? (
              <>
                <Box
                  sx={{ height: hasHorizontalSpace ? "100%" : "70%", width: "100%" }}
                >
                  <ResponsivePie
                    data={formatedData || []}
                    margin={{
                      top: 20,
                      right: 0,
                      bottom: 20,
                      left: 0,
                    }}
                    sortByValue={true}
                    innerRadius={hasHorizontalSpace ? 0.55 : 0.43}
                    padAngle={2}
                    onMouseEnter={mouseEnterHandler}
                    animate={false}
                    tooltip={() => <></>}
                    activeOuterRadiusOffset={0}
                    cornerRadius={6}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={15}
                    arcLinkLabelsStraightLength={7}
                    arcLinkLabelsDiagonalLength={15}
                    arcLinkLabelsTextOffset={4}
                    arcLabelsTextColor="#fafafa"
                    arcLinkLabel={(e) => e.label}
                    arcLabel={(e) =>
                      `${((e.value / totalBalance) * 100).toFixed(2)}%`
                    }
                    colors={({ data }) => data.color}
                    enableArcLabels={false}
                    enableArcLinkLabels={false}
                  />
                </Box>
                {hasHorizontalSpace ? (
                  <Box
                    sx={{
                      // border: 1,
                      // borderColor: accountInfo.color,
                      // bgcolor: `${accountInfo.color}22`,
                      borderRadius: "50%",
                      width: "14rem",
                      height: "14rem",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      overflow: "hidden",
                      transform: "translate(-50%,-50%)",
                      display: "flex",
                      flexDirection: " column",
                      justifyContent: " center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          height: "1rem",
                          width: "1rem",
                          bgcolor: accountInfo.color || formatedData[0].color,
                          mr: 1,
                          borderRadius: "2px",
                        }}
                      ></Box>
                      <Typography
                        noWrap
                        sx={{
                          maxWidth: "160px",
                          textAlign: "center",
                          fontWeight: "bold",
                          color: theme.palette.grey[900],
                          fontSize: 18,
                        }}
                      >
                        {accountInfo.label || formatedData[0].label}
                      </Typography>
                    </Box>
                    <Typography
                      noWrap
                      sx={{
                        color: theme.palette.grey[900],
                        fontSize: 20,
                        maxWidth: "170px",
                        fontWeight: "light",
                      }}
                    >
                      {currencyFormat(
                        accountInfo.value || formatedData[0].value
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.grey[900],
                        fontSize: 18,
                        fontWeight: "light",
                      }}
                    >
                      {(
                        ((accountInfo.value || formatedData[0].value) /
                          totalBalance) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      border: 1,
                      borderRadius: 2,
                      px: 3,
                      py: 2,
                      borderColor: "gray",
                      width: "70%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center',
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          height: "1rem",
                          width: "1rem",
                          bgcolor: accountInfo.color || formatedData[0].color,
                          mr: 1,
                          borderRadius: "2px",
                        }}
                      ></Box>
                      <Typography
                        noWrap
                        sx={{
                          textAlign: "center",
                          // width: '100%',
                          textOverflow: "ellipsis",
                          fontWeight: "bold",
                          color: theme.palette.grey[900],
                          fontSize: 18,
                        }}
                      >
                        {accountInfo.label || formatedData[0].label}
                      </Typography>
                    </Box>
                    <Typography
                      noWrap
                      sx={{
                        color: theme.palette.grey[900],
                        fontSize: 20,
                        maxWidth: "170px",
                        fontWeight: "light",
                      }}
                    >
                      {currencyFormat(
                        accountInfo.value || formatedData[0].value
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.grey[900],
                        fontSize: 18,
                        fontWeight: "light",
                      }}
                    >
                      {(
                        ((accountInfo.value || formatedData[0].value) /
                          totalBalance) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Box>
                )}
              </>
            ) : (
              <p>No data</p>
            )}
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Card>
  );
};
