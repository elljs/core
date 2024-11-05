import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/custom/nav-header";
import { NavbarProvider } from "@/components/custom/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KeepAliveRouteOutlet } from "keepalive-for-react";
import {
	Bot,
	FilePenLine,
	Files,
	LayoutDashboard,
	Settings2,
	User2
} from "lucide-react";

const menus = [
	{
		name: "总览",
		url: "/",
		icon: LayoutDashboard,
	},
	{
		name: "运营",
		url: "/operation",
		items: [
			{
				name: "客户管理",
				url: "/operation/customer",
				icon: User2,
			},
		],
	},
	{
		name: "应用",
		url: "/app",
		items: [
			{
				name: "文本编辑器",
				url: "/app/editor",
				icon: FilePenLine,
			},
			{
				name: "文件管理器",
				url: "/app/file-manager",
				icon: Files,
			},
			{
				name: "聊天机器人",
				url: "/app/bot",
				icon: Bot,
			},
		],
	},
	{
		name: "设置",
		url: "/setting",
		icon: Settings2,
	},
];

export default function MainLayout() {
	return (
		<NavbarProvider defaultLink={menus[0]}>
			<SidebarProvider>
				<AppSidebar menus={menus} />
				<div className="w-full h-screen overflow-x-hidden bg-accent text-accent-foreground">
					<NavHeader />
					<main className="h-layout">
						<KeepAliveRouteOutlet transition />
					</main>
				</div>
			</SidebarProvider>
		</NavbarProvider>
	);
}
