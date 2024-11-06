import { AppSidebar } from "@/components/custom/app-sidebar";
import { NavHeader } from "@/components/custom/nav-header";
import { NavLink, NavbarProvider } from "@/components/custom/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import KeepAlive, { useKeepaliveRef } from "keepalive-for-react";
import {
	Cpu,
	FilePenLine,
	Files,
	LayoutDashboard,
	Settings2,
	User2
} from "lucide-react";
import { Suspense, useMemo } from "react";
import { useLocation, useOutlet } from "react-router-dom";

const menus: NavLink[] = [
	{
		name: "总览",
		url: "/",
		icon: LayoutDashboard,
	},
	{
		name: "区块",
		url: "/block",
		items: [
			{
				name: "客户管理",
				url: "/block/customer",
				icon: User2,
			},
		],
	},
	{
		name: "组件",
		url: "/component",
		items: [
			{
				name: "文本编辑器",
				url: "/component/editor",
				icon: FilePenLine,
			},
			{
				name: "文件管理器",
				url: "/component/file-manager",
				icon: Files,
			},
			{
				name: "大语言模型",
				url: "/component/llm",
				icon: Cpu,
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
	const location = useLocation();
	const aliveRef = useKeepaliveRef();
	const outlet = useOutlet();

	const currentCacheKey = useMemo(() => {
		return location.pathname + location.search;
	}, [location.pathname, location.search]);

	return (
		<NavbarProvider aliveRef={aliveRef} current={currentCacheKey} defaultLink={menus[0]}>
			<SidebarProvider>
				<AppSidebar menus={menus} />
				<div className="w-full h-screen overflow-x-hidden bg-accent text-accent-foreground">
					<NavHeader />
					<main className="h-layout">
						<KeepAlive transition aliveRef={aliveRef} activeCacheKey={currentCacheKey} max={18}>
							<Suspense fallback={<div>Loading...</div>}>
								{outlet}
							</Suspense>
						</KeepAlive>
					</main>
				</div>
			</SidebarProvider>
		</NavbarProvider>
	);
}
