"use client";

import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "convex/react";
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@workspace/ui/components/chart";
import { Badge } from "@workspace/ui/components/badge";
import { TrendingDown } from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { ToggleSidebar } from "@/modules/dashboard/ui/components/toggle-sidebar";

const chartConfig = {
  conversations: {
    label: "Conversations",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const statusConfig = {
  resolved: {
    label: "AI Resolved",
    color: "var(--chart-2)",
  },
  unresolved: {
    label: "AI In Progress",
    color: "var(--chart-1)",
  },
  escalated: {
    label: "Human Escalated",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  const stats = useQuery(api.private.analytics.getStats);
  const chartRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState(0);

  // motion values
  const springX = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });
  const springY = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  useMotionValueEvent(springX, "change", (latest) => {
    setAxis(latest);
  });

  const chartData = useMemo(() => stats?.volumeByDate.map((item) => ({
    date: item.date,
    conversations: item.count,
  })) || [], [stats]);

  useEffect(() => {
    if (chartData.length > 0) {
      const lastValue = chartData[chartData.length - 1]?.conversations || 0;
      springY.set(lastValue);
    }
  }, [chartData, springY]);

  if (!stats) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted">
            <header className="flex items-center gap-2 border-b bg-background px-4 py-3">
                <ToggleSidebar />
                <h1 className="text-lg font-semibold">Analytics</h1>
            </header>
      <div className="flex flex-col gap-4 m-auto w-full max-w-sm md:max-w-4xl  rounded-xl md:p-8">
        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>
              {springY.get().toFixed(0)}
              <Badge variant="secondary" className="ml-2">
                <TrendingDown className="h-4 w-4" />
                <span>Daily Volume</span>
              </Badge>
            </CardTitle>
            <CardDescription>Conversations over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              ref={chartRef}
              className="h-54 w-full aspect-[4/3]"
              config={chartConfig}
            >
              <AreaChart
                className="overflow-visible"
                accessibilityLayer
                data={chartData}
                onMouseMove={(state) => {
                  const x = state.activeCoordinate?.x;
                  const dataValue = state.activePayload?.[0]?.value;
                  if (x && dataValue !== undefined) {
                    springX.set(x);
                    springY.set(dataValue as number);
                  }
                }}
                onMouseLeave={() => {
                  springX.set(chartRef.current?.getBoundingClientRect().width || 0);
                  springY.jump(chartData[chartData.length - 1]?.conversations || 0);
                }}
                margin={{
                  right: 0,
                  left: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  horizontalCoordinatesGenerator={(props) => {
                    const { height } = props;
                    return [0, height - 30];
                  }}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                />
                <Area
                  dataKey="conversations"
                  type="monotone"
                  fill="url(#gradient-cliped-area-conversations)"
                  fillOpacity={0.4}
                  stroke="var(--color-conversations)"
                  clipPath={`inset(0 ${
                    Number(chartRef.current?.getBoundingClientRect().width) - axis
                  } 0 0)`}
                />
                <line
                  x1={axis}
                  y1={0}
                  x2={axis}
                  y2={"85%"}
                  stroke="var(--color-conversations)"
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  strokeOpacity={0.2}
                />
                <rect
                  x={axis - 50}
                  y={0}
                  width={50}
                  height={18}
                  fill="var(--color-conversations)"
                />
                <text
                  x={axis - 25}
                  fontWeight={600}
                  y={13}
                  textAnchor="middle"
                  fill="var(--primary-foreground)"
                >
                  {springY.get().toFixed(0)}
                </text>
                {/* this is a ghost line behind graph */}
                <Area
                  dataKey="conversations"
                  type="monotone"
                  fill="none"
                  stroke="var(--color-conversations)"
                  strokeOpacity={0.1}
                />
                <defs>
                  <linearGradient
                    id="gradient-cliped-area-conversations"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-conversations)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-conversations)"
                      stopOpacity={0}
                    />
                    <mask id="mask-cliped-area-chart">
                      <rect
                        x={0}
                        y={0}
                        width={"50%"}
                        height={"100%"}
                        fill="white"
                      />
                    </mask>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>AI Performance</CardTitle>
            <CardDescription>Conversations handled by AI vs Human</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={statusConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <Pie
                  data={stats.statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {stats.statusDistribution.map((entry) => (
                    <Cell key={entry.status} fill={statusConfig[entry.status as keyof typeof statusConfig]?.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent nameKey="status" />} className="-translate-y-2 gap-2 [&>*]:basis-1/4" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  );
}
