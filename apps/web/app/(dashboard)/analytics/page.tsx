"use client";

import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "convex/react";
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Bar, BarChart, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@workspace/ui/components/chart";
import { Badge } from "@workspace/ui/components/badge";
import { TrendingDown, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
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
    color: "#22c55e",
  },
  unresolved: {
    label: "AI In Progress",
    color: "#3b82f6",
  },
  escalated: {
    label: "Human Escalated",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const comparisonConfig = {
  aiResolved: {
    label: "AI Resolved",
    color: "#22c55e",
  },
  humanEscalated: {
    label: "Human Escalated",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const stackedConfig = {
  resolved: {
    label: "Resolved",
    color: "#22c55e",
  },
  unresolved: {
    label: "In Progress",
    color: "#3b82f6",
  },
  escalated: {
    label: "Escalated",
    color: "#ef4444",
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

  const stackedChartData = useMemo(() => stats?.statusByDate.map((item) => ({
    date: item.date,
    resolved: item.resolved,
    unresolved: item.unresolved,
    escalated: item.escalated,
  })) || [], [stats]);

  const comparisonData = useMemo(() => [
    { name: "AI Resolved", value: stats?.aiResolved || 0, fill: "#22c55e" },
    { name: "Human Escalated", value: stats?.humanEscalated || 0, fill: "#ef4444" },
  ], [stats]);

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
      <div className="flex flex-col gap-4 m-auto w-full max-w-sm md:max-w-4xl rounded-xl md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConversations}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Resolution Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.aiResolutionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.aiResolved} resolved by AI
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Human Escalations</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.humanEscalated}</div>
              <p className="text-xs text-muted-foreground">
                Required human intervention
              </p>
            </CardContent>
          </Card>
        </div>

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

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="w-full overflow-hidden">
            <CardHeader>
              <CardTitle>AI Performance</CardTitle>
              <CardDescription>Conversations handled by AI vs Human</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-hidden p-0 sm:p-6">
              <ChartContainer config={statusConfig} className="mx-auto aspect-square max-h-[300px] w-full">
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

          <Card className="w-full overflow-hidden">
            <CardHeader>
              <CardTitle>AI vs Human</CardTitle>
              <CardDescription>Resolved by AI vs Escalated to Human</CardDescription>
            </CardHeader>
            <CardContent className="w-full overflow-hidden p-0 sm:p-6">
              <ChartContainer config={comparisonConfig} className="min-h-[300px] w-full max-w-full">
                <BarChart data={comparisonData} margin={{ left: 0, right: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {comparisonData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daily Status Breakdown</CardTitle>
            <CardDescription>Conversation status by day (last 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={stackedConfig} className="min-h-[300px] w-full">
              <BarChart data={stackedChartData}>
                <CartesianGrid vertical={false} />
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
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="resolved" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                <Bar dataKey="unresolved" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="escalated" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <ChartLegend content={<ChartLegendContent />} className="-translate-y-2" />
              </BarChart>
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
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}
