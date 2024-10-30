import { Logo } from "@/components/custom/logo";
import { NavUser } from "@/components/custom/nav-user";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import constants from "@/constants";
import {
	Bot,
	ChevronLeft,
	ChevronRight,
	FilePenLine,
	Files,
	LayoutDashboard,
	Settings2,
	User2
} from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

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
		name: "系统",
		url: "/setting",
		items: [
			{
				name: "平台设置",
				url: "/setting/platform",
				icon: Settings2,
			},
		],
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { pathname } = useLocation();
	const { open, toggleSidebar } = useSidebar();

	return (
		<Sidebar variant="sidebar" collapsible="icon" {...props}>
			<Button
				className="absolute top-[50%] -right-4 w-8 h-8 rounded-full text-foreground bg-background hover:bg-primary hover:text-primary-foreground"
				size="icon"
				onClick={toggleSidebar}
			>
				{open ? <ChevronLeft /> : <ChevronRight />}
			</Button>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/">
								<Logo />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{constants.name}
									</span>
									<span className="truncate text-xs">
										{constants.description}
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{menus.map(({ icon: Icon, ...item }) => {
					if (item.items && item.items.length > 0) {
						return (
							<SidebarGroup key={item.url}>
								<SidebarGroupLabel>{item.name}</SidebarGroupLabel>
								<SidebarMenu>
									{item.items.map(({ icon: Icon, ...item }) => (
										<SidebarMenuItem key={item.url}>
											<SidebarMenuButton
												className={
													pathname === item.url
														? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
														: ""
												}
												asChild
												tooltip={item.name}
											>
												<Link to={item.url}>
													{Icon && <Icon />}
													<span>{item.name}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroup>
						);
					}
					return (
						<SidebarGroup key={item.url}>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										className={
											pathname === item.url
												? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
												: ""
										}
										asChild
										tooltip={item.name}
									>
										<Link to={item.url}>
											{Icon && <Icon />}
											<span>{item.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroup>
					);
				})}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
