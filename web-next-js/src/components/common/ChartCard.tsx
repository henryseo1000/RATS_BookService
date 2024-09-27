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
import { Table, TableCell, TableHeader, TableRow } from "../ui/table";

interface ChartProps {
  title? : string | ReactElement,
  description? : string,
  maxVal? : number,
  countVal? : number,
  fillColor? : string,
  chartInsideText? : string,
  useTable? : boolean
}

export function ChartCard( {
  title,
  description,
  maxVal,
  countVal,
  fillColor,
  chartInsideText,
  useTable
} : ChartProps ) {
  const chartData = [
    { browser: "chrome", visitors: 200, fill: "var(--color-chrome)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: fillColor ? fillColor : "hsl(var(--chart-2))"
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col w-full min-w-[300px]">
      <CardHeader className="pb-5">
        <CardTitle>{title ? title : ""}</CardTitle>
        {
          description &&
          <CardDescription>{ description }</CardDescription>
        }
      </CardHeader>
      <CardContent className="flex pb-0">
        {
          useTable &&
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableCell>책 이름</TableCell>
                <TableCell>대출일</TableCell>
                <TableCell>반납일</TableCell>
                <TableCell>연장 횟수</TableCell>
              </TableRow>
            </TableHeader>
          </Table>
        }

        <ChartContainer
          config={chartConfig}
          className="min-w-[200px] mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(maxVal && countVal && maxVal !== 0) ? 360 * countVal / maxVal : 250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {countVal && maxVal ? `${countVal} / ${maxVal}` : ""}
                          {countVal && !maxVal ? countVal : ""}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <span></span>
      </CardFooter>
    </Card>
  )
}

export default ChartCard;