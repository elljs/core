
import { PaletteIcon, Settings2Icon } from "lucide-react";
import { Page } from "@/components/custom/page";
import { Outlet, useOutlet } from "react-router-dom";
import { Layout } from "@/components/custom/layout";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
	{
		title: "账户",
		icon: <Settings2Icon size={18} />,
		href: "/settings/profile",
	},
	{
		title: "外观",
		icon: <PaletteIcon size={18} />,
		href: "/settings/appearance",
	},
];

export default function SettingLayout() {
	return (
		<Page header="设置">
			<div className="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0 bg-card">
				<aside className="top-0 lg:sticky lg:w-1/5">
					{/* <SidebarNav items={sidebarNavItems} /> */}
				</aside>
				<div className="flex w-full p-1 pr-4 md:overflow-y-hidden">
					<Outlet />
				</div>
			</div>
		</Page>
	);
}
