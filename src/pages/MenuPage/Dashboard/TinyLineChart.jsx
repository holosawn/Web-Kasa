import * as React from "react";
import {
  ResponsiveChartContainer,
  ChartsTooltip,
  MarkPlot,
  LinePlot,
  AreaPlot,
} from "@mui/x-charts";
import { getDateOptions, dateValueFormatter } from "../../../utils/helpers";

export default function TinyLineChart({ yData, xData, timeline, dataLabel }) {
  const dateObjects = xData.map((item) => new Date(item));
  const dateOptions = getDateOptions(timeline);

  return (
    <ResponsiveChartContainer
      height={100}
      margin={{ top: 8, left: 0, right: 0, bottom: 0 }}
      series={[
        {
          data: yData,
          label: dataLabel,
          type: "line",
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          data: dateObjects,
          valueFormatter: (date) => dateValueFormatter(date, dateOptions),
        },
      ]}
      sx={{
        overflow: "visible",
        px: 0,
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
    >
      <LinePlot />
      <AreaPlot />
      <MarkPlot />
      <ChartsTooltip />
    </ResponsiveChartContainer>
  );
}
