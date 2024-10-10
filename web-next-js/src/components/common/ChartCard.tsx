"use client";

import { ReactElement } from "react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

import st from "./ChartCard.module.scss";
import { Button } from "../ui/button";
import { ColProps } from "@/types/common/colProps";

interface ChartProps {
  title? : string | ReactElement,
  description? : string,
  maxVal? : number,
  countVal? : number,
  fillColor? : string,
  chartInsideText? : string,
  useTable? : boolean,
  footerText? : string
  tableData? : any[],
  columnData? : ColProps[]
}

export function ChartCard( {
  title,
  description,
  maxVal,
  countVal,
  fillColor,
  chartInsideText,
  useTable,
  footerText,
  tableData,
  columnData
} : ChartProps ) {
  const chartData = [
    { browser: "chrome", books: 200, fill: "var(--color-chrome)" },
  ];

  const chartConfig = {
    books: {
      label: "Book Status",
    },
    chrome: {
      label: "Chrome",
      color: fillColor ? fillColor : "hsl(var(--chart-2))"
    },
  } satisfies ChartConfig;

  return (
    <Card className={st.card_container}>
      <CardHeader className={st.card_header}>
        <CardTitle>{title ? title : ""}</CardTitle>
        {
          description &&
          <CardDescription>{ description }</CardDescription>
        }
      </CardHeader>
      <CardContent className={st.card_content}>
      <ChartContainer
          config={chartConfig}
          className={st.chart_container}
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(maxVal && maxVal !== 0) ? 360 * countVal / maxVal : 250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className={st.polar_grid}
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="books" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={st.tspan}
                        >
                          {countVal && maxVal ? `${countVal} / ${maxVal}` : ""}
                          {!countVal && maxVal ? `0 / ${maxVal}` : ""}
                          {countVal && !maxVal ? countVal : ""}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className={st.tspan_2}
                        >
                          {chartInsideText ? chartInsideText : ""}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>

        {
          useTable &&
          <Table className={st.table_container}>
            <TableHeader>
              <TableRow>
                { columnData?.map((item, index) => {
                  return <TableCell key={index}>{item?.label}</TableCell>
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              { tableData?.length >= 1 ?
                tableData.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item?.title}</TableCell>
                      <TableCell>{item?.author}</TableCell>
                      <TableCell>{item?.book_id}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {}}
                        >
                          연장
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              :
                <span>No Data Found</span>
            }
            </TableBody>
          </Table>
        }
      </CardContent>
      <CardFooter className={st.card_footer}>
        {footerText && <span>{footerText}</span>}
      </CardFooter>
    </Card>
  )
}

export default ChartCard;