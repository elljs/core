import * as React from "react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const chartData = [
	{ browser: "京东", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "天猫", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "淘宝", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "拼多多", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "其他", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "hsl(var(--chart-1))",
	},
	safari: {
		label: "Safari",
		color: "hsl(var(--chart-2))",
	},
	firefox: {
		label: "Firefox",
		color: "hsl(var(--chart-3))",
	},
	edge: {
		label: "Edge",
		color: "hsl(var(--chart-4))",
	},
	other: {
		label: "Other",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

const colors = [
	"bg-violet-500",
	"bg-rose-500",
	"bg-yellow-500",
	"bg-green-500",
	"bg-stone-500",
];

export function SalesProportion() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	return (
		<div className="flex flex-col">
			<ResponsiveContainer width="100%" height={300}>
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="visitors"
							nameKey="browser"
							innerRadius={60}
							strokeWidth={5}
						>
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
													className="fill-foreground text-3xl font-bold"
												>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Visitors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</ResponsiveContainer>
			<div className="grid grid-cols-5 gap-1">
				{chartData.map((item, i) => (
					<div
						key={item.browser}
						className="flex flex-col items-center p-2 border-dashed rounded-lg border"
					>
						<p className="text-xs text-muted-foreground">
							<span
								className={cn(
									"mr-1 inline-block h-2 w-2 rounded-full",
									colors[i],
								)}
							/>
							{item.browser}
						</p>
						<p className="text-sm font-medium">{item.visitors}</p>
					</div>
				))}
			</div>
		</div>
	);
}
