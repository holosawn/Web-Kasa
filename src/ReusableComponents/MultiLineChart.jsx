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

function calculateLinearScaleDomain(data, marginTop, marginBottom) {
  const minValue = 0; // Minimum value for the domain
  const maxValue = Math.max(...data); // Maximum value from the data

  // Nice the domain to make it more human-readable
  const niceMinValue = minValue;
  const niceMaxValue = Math.ceil(maxValue / 10) * 10; // Round up to the nearest 10

  // Calculate the range based on the provided margins and height
  const height = 500; // Example height of the chart
  const rangeMin = height - marginBottom;
  const rangeMax = marginTop;

  // Return the domain and range as an object
  return {
      domain: [niceMinValue, niceMaxValue],
      range: [rangeMin, rangeMax]
  };
}

function nice(domain, count = 5) {
  let start = domain[0];
  let stop = domain[1];
  let step = Math.pow(10, Math.floor(Math.log10(stop - start) - 1));

  step = step * Math.ceil((stop - start) / step / count);

  start = Math.floor(start / step) * step;
  stop = Math.ceil(stop / step) * step;

  return [start, stop];
}

function customConfigureTickNumber(startNum, stopNum){
  let start = startNum, stop = stopNum;
  
  const count = 7;
  const range = stop-start;
  const step = tickIncrement(startNum, stopNum, count);
  start = Math.ceil(start/step)
  stop = Math.floor(stop/step);
  const ticks=[];
  

  for (let i = 0 ; i < Math.ceil(stop - start + 1); i++) {
    ticks[i] = (start + i) * step;
  }

  return ticks;
};

export function tickIncrement(start, stop, count) {
  const e10 = Math.sqrt(50), // Adjust these values as per your requirements
        e5 = Math.sqrt(10),
        e2 = Math.sqrt(2);

  let step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);


  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}


export default function MultiLineChart({ series, dates, timeline, height }) {

  const dateObjects = dates.map((item) => new Date(item));
  const dataArray = series.map((obj) => obj.data);
  const flattenData = dataArray.reduce((acc, curr) => acc.concat(curr), []);

  const dateOptions = getDateOptions(timeline);

  const scaleProperties = calculateLinearScaleDomain(flattenData,0, 0);
  const tickValues = customConfigureTickNumber(...nice(scaleProperties.domain));

  return (
    <Paper
      elevation={1}
      sx={{
        width: { md: "70%", xs: "98%" },
        height: height ? height :"510px",
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
          ".MuiChartsAxis-tick":{
            stroke:'gray',
            strokeWidth:0.5
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
        {tickValues.map(coord =>(
          <ChartsReferenceLine
            key={coord}
            y={coord}
            lineStyle={{strokeWidth:0.5, stroke:'gray'}}
          />
        ))}

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
          disableTicks={true}
        />
        <ChartsYAxis position="left" axisId="y-axis-id" disableLine={true} />
      </ResponsiveChartContainer>
    </Paper>
  );
}

