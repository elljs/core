import { SparkAreaChart } from "@/components/custom/charts/spark-chart";
import { Page } from "@/components/custom/page";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import NumberFlow from '@number-flow/react';
import dayjs from "dayjs";
import { Activity, BadgeDollarSign, Podcast, Wallet } from "lucide-react";
import { Overview } from './components/overview';
import { RecentSales } from './components/recent-sales';
import { SalesProportion } from "./components/sales-proportion";
import { Trend } from "./components/trend";
import { Button } from "@/components/ui/button";

const chartdata = [
	{
		month: "Jan 21",
		Performance: 1000,
	},
	{
		month: "Feb 21",
		Performance: 3000,
	},
	{
		month: "Mar 21",
		Performance: 2000,
	},
	{
		month: "Apr 21",
		Performance: 2780,
	},
	{
		month: "May 21",
		Performance: 1890,
	},
	{
		month: "Jun 21",
		Performance: 2390,
	},
	{
		month: "Jul 21",
		Performance: 3490,
	},
];

export default function Dashboard() {

	return (
		<Page
			header="总览"
			extra={
				<span className="text-sm font-semibold">
					{dayjs().format("YYYY年MM月DD日")}
				</span>
			}
		>
			<div className="space-y-4 pb-4">
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								总收入
							</CardTitle>
							<div className="p-2 rounded-full bg-violet-500 text-white">
								<Wallet className="size-4" />
							</div>
						</CardHeader>
						<CardContent className="flex items-center justify-between">
							<div>
								<div className='text-2xl font-bold'>$
									<NumberFlow
										className="ml-1"
										value={45231.89}
									/>
								</div>
								<p className='text-xs text-muted-foreground text-emerald-500'>
									+20.1% 较上个月
								</p>
							</div>
							<SparkAreaChart
								data={chartdata}
								categories={["Performance"]}
								index={"month"}
								colors={["violet"]}
								className="h-8 w-20 sm:h-10 sm:w-36"
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								订阅数
							</CardTitle>
							<div className="p-2 rounded-full bg-lime-500 text-white">
								<Podcast className="size-4" />
							</div>
						</CardHeader>
						<CardContent className="flex items-center justify-between">
							<div>
								<div className='text-2xl font-bold'>+
									<NumberFlow
										className="ml-1"
										value={2350}
									/>
								</div>
								<p className='text-xs text-muted-foreground text-emerald-500'>
									+180.1% 较上个月
								</p>
							</div>
							<SparkAreaChart
								data={chartdata}
								categories={["Performance"]}
								index={"month"}
								colors={["lime"]}
								className="h-8 w-20 sm:h-10 sm:w-36"
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>销售量</CardTitle>
							<div className="p-2 rounded-full bg-blue-500 text-white">
								<BadgeDollarSign className="size-4" />
							</div>
						</CardHeader>
						<CardContent className="flex items-center justify-between">
							<div>
								<div className='text-2xl font-bold'>+
									<NumberFlow
										className="ml-1"
										value={12234}
									/>
								</div>
								<p className='text-xs text-muted-foreground text-rose-500'>
									+19% 较上个月
								</p>
							</div>
							<SparkAreaChart
								data={chartdata}
								categories={["Performance"]}
								index={"month"}
								colors={["blue"]}
								className="h-8 w-20 sm:h-10 sm:w-36"
							/>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								活跃中
							</CardTitle>
							<div className="p-2 rounded-full bg-amber-500 text-white">
								<Activity className="size-4" />
							</div>
						</CardHeader>
						<CardContent className="flex items-center justify-between">
							<div>
								<div className='text-2xl font-bold'>+
									<NumberFlow
										className="ml-1"
										value={573}
									/>
								</div>
								<p className='text-xs text-muted-foreground text-emerald-500'>
									+201 近一个小时以来
								</p>
							</div>
							<SparkAreaChart
								data={chartdata}
								categories={["Performance"]}
								index={"month"}
								colors={["amber"]}
								className="h-8 w-20 sm:h-10 sm:w-36"
							/>
						</CardContent>
					</Card>
				</div>
				<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-6">
					<Card className='col-span-1 lg:col-span-4'>
						<CardHeader className="flex flex-row items-center justify-between space-y-0">
							<CardTitle className="text-lg">热门产品</CardTitle>
							<Button className="text-xs" variant="secondary" size="sm">查看更多</Button>
						</CardHeader>
						<CardContent>
							<Trend />
						</CardContent>
					</Card>
					<Card className='col-span-1 lg:col-span-2'>
						<CardHeader>
							<CardTitle className="text-lg">销售占比</CardTitle>
						</CardHeader>
						<CardContent>
							<SalesProportion />
						</CardContent>
					</Card>
				</div>
				<div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
					<Card className='col-span-1 lg:col-span-3'>
						<CardHeader>
							<CardTitle className="text-lg">近期销售</CardTitle>
							<CardDescription>
								您这个月完成了265笔销售。
							</CardDescription>
						</CardHeader>
						<CardContent>
							<RecentSales />
						</CardContent>
					</Card>
					<Card className='col-span-1 lg:col-span-4'>
						<CardHeader>
							<CardTitle className="text-lg">数据分析</CardTitle>
						</CardHeader>
						<CardContent className='pl-2'>
							<Overview />
						</CardContent>
					</Card>
				</div>
			</div>
		</Page>
	);
}

