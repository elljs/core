import { LandPlot } from "lucide-react";

export default function ComingSoon() {
	return (
		<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
			<LandPlot size={72} />
			<h1 className="text-4xl font-bold leading-tight">即将推出</h1>
			<p className="text-center text-muted-foreground">
				该页面尚未创建。
				<br />
				不过请保持关注！
			</p>
		</div>
	);
}
