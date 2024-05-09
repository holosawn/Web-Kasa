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
import { getDateOptions, dateValueFormatter } from "../../../utils/helpers";

// data is an array of values of different lines that will be used to derive domain
// Returns the value domain and range as an object
function calculateLinearScaleDomain(data, marginTop, marginBottom) {
  const minValue = 0; 
  const maxValue = Math.max(...data); 

  // Nice the domain to make it more human-readable
  const niceMinValue = minValue;
  const niceMaxValue = Math.ceil(maxValue / 10) * 10; // Round up to the nearest 10

  // Calculate the range based on the provided margins and height
  const height = 500; 
  const rangeMin = height - marginBottom;
  const rangeMax = marginTop;

  return {
      domain: [niceMinValue, niceMaxValue],
      range: [rangeMin, rangeMax]
  };
}

// Takes a domain (i.e. an array of two numbers representing the start and end of a range) and a count (defaulting to 5) and returns a new domain with "nice" numbers. 
function nice(domain, count = 5) {
  let start = domain[0];
  let stop = domain[1];
  let step = Math.pow(10, Math.floor(Math.log10(stop - start) - 1));

  step = step * Math.ceil((stop - start) / step / count);

  start = Math.floor(start / step) * step;
  stop = Math.ceil(stop / step) * step;

  return [start, stop];
}

// takes a start number, a stop number, and returns an array of ticks based on the `tickIncrement` function.
// This function is used to configure the tick numbers for a chart axis.
function customConfigureTickNumber(startNum, stopNum){
  let start = startNum, stop = stopNum;

  const count = 7;

  const step = tickIncrement(startNum, stopNum, count);
  start = Math.ceil(start/step)
  stop = Math.floor(stop/step);
  const ticks=[];

  for (let i = 0 ; i < Math.ceil(stop - start + 1); i++) {
    ticks[i] = (start + i) * step; 
  }

  return ticks;
}

//Takes a start number, a stop number, and a count and returns a step size that will result in approximately the desired number of ticks within the range.
export function tickIncrement(start, stop, count) {
  const e10 = Math.sqrt(50), 
        e5 = Math.sqrt(10),
        e2 = Math.sqrt(2);

  let step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);


  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

// series is an object contains props for a MUI graph
export default function MultiLineChart({ series, dates, timeline, height }) {

  const dateObjects = dates.map((item) => new Date(item));

  // Map the `series` array to an array of single coordinate values
  const dataArray = series.map((obj) => obj.data);
  const flattenData = dataArray.reduce((acc, curr) => acc.concat(curr), []);


  // Calculate the domain and range of the y-axis
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
          // Customize the appearance of the lines
          ".MuiLineElement-root": {
            strokeWidth: 2,
          },
          ".MuiMarkElement-highlighted": {
            strokeWidth: 6,
            transition: "all 0.15s ease",
          },
          // Customize the appearance of the x-axis ticks
          ".MuiChartsAxis-tick":{
            stroke:'gray',
            strokeWidth:0.5
          },
          // Hide the x-axis ticks that are not highlighted
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

