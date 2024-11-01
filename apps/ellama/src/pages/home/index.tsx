import { Page } from "@/components/custom/page";
import dayjs from "dayjs";

export default function Home() {
	return (
		<Page
			header="首页"
			extra={
				<span className="text-sm font-semibold">
					{dayjs().format("YYYY年MM月DD日")}
				</span>
			}
		>
		</Page>
	);
}
