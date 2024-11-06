
import { Page } from "@/components/custom/page";
import SidebarNav from "@/pages/setting/components/sidebar-nav";
import { MonitorCog, PaletteIcon, User2 } from "lucide-react";
import { Outlet } from "react-router-dom";

const sidebarNavItems = [
	{
		title: "账户",
		icon: <User2 size={18} />,
		href: "/setting",
	},
	{
		title: "系统",
		icon: <MonitorCog size={18} />,
		href: "/setting/system",
	},
	{
		title: "外观",
		icon: <PaletteIcon size={18} />,
		href: "/setting/appearance",
	},
];

export default function SettingLayout() {
	return (
		<Page header="设置">
			<div className="flex flex-1 flex-col space-y-8 p-2 rounded-lg border md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0 bg-card">
				<aside className="top-0 lg:sticky lg:w-1/5">
					<SidebarNav items={sidebarNavItems} />
				</aside>
				<div className="flex w-full p-2 md:overflow-y-hidden overflow-x-hidden">
					<Outlet />
				</div>
			</div>
		</Page>
	);
}
