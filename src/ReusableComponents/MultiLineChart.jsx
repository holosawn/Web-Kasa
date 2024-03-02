import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import {
  BarPlot,
  ChartsAxisHighlight,
  ChartsLegend,
  ChartsReferenceLine,
  ChartsTooltip,
  ChartsYAxis,
} from "@mui/x-charts";
import { Paper } from "@mui/material";
import { getDateOptions, dateValueFormatter } from "../utils/helpers";

function roundToClosestNonZero(num) {
  let numStr = num.toString();
  let firstDigit = parseInt(numStr[0]) + 1;
  if (firstDigit === 10) {
    firstDigit = 1;
    numStr = "1" + "0".repeat(numStr.length);
  } else {
    numStr = firstDigit.toString() + "0".repeat(numStr.length - 1);
  }
  return parseInt(numStr);
}


export default function MultiLineChart({ series, dates, timeline }) {
  // todo: fix the wrong reference lines

  const dateObjects = dates.map((item) => new Date(item));
  const dataArray = series.map((obj) => obj.data);
  const flattenData = dataArray.reduce((acc, curr) => acc.concat(curr), []);

  const maxRef = roundToClosestNonZero(Math.max(...flattenData));
  const dateOptions = getDateOptions(timeline);

  return (
    <Paper
      elevation={1}
      sx={{
        width: { md: "70%", xs: "98%" },
        height: "510px",
        backgroundColor: "white",
        borderRadius: 5,
        mx: 1,
      }}
    >
      <ResponsiveChartContainer
        margin={{ left: 60, bottom: 80 }}
        sx={{
          ".MuiLineElement-root": {
            strokeWidth: 2,
          },
          ".MuiMarkElement-highlighted": {
            strokeWidth: 6,
            transition: "all 0.15s ease",
          },
          ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)": {
            display: "none",
          },
        }}
        series={series}
        xAxis={[
          {
            data: dateObjects,
            scaleType: "band",
            id: "x-axis-id",
            stroke: "gray",
            valueFormatter: (dateItem) =>
              dateValueFormatter(dateItem, dateOptions),
          },
        ]}
        yAxis={[
          {
            scaleType: "linear",
            id: "y-axis-id",
          },
        ]}
      >
        <ChartsReferenceLine
          y={0}
          lineStyle={{ stroke: "#E8E8E8", zIndex: 1 }}
        />
        <ChartsReferenceLine
          y={(maxRef * 1) / 5}
          lineStyle={{ stroke: "#E8E8E8", zIndex: 1 }}
        />
        <ChartsReferenceLine
          y={(maxRef * 2) / 5}
          lineStyle={{ stroke: "#E8E8E8", zIndex: 1 }}
        />
        <ChartsReferenceLine
          y={(maxRef * 3) / 5}
          lineStyle={{ stroke: "#E8E8E8", zIndex: 1 }}
        />
        <ChartsReferenceLine
          y={maxRef}
          lineStyle={{ stroke: "#E8E8E8", zIndex: 1 }}
        />
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsLegend
          position={{ vertical: "bottom", horizontal: "middle" }}
          slotProps={{ legend: { padding: 10 } }}
        />
        <ChartsTooltip trigger="axis" />
        <ChartsAxisHighlight x="line" />
        <ChartsXAxis
          position="bottom"
          axisId="x-axis-id"
          stroke="gray"
          disableTicks={true}
        />
        <ChartsYAxis position="left" axisId="y-axis-id" disableLine={true} />
      </ResponsiveChartContainer>
    </Paper>
  );
}

