import { Logo } from "@/components/custom/logo";
import { StatusLight } from "@/components/custom/status-light";
import { useTheme } from "@/components/custom/theme-provider";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
	Brain,
	Moon,
	Settings,
	Sun
} from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

const menus = [
	{
		name: '管理',
		url: '/',
		items: [
			{
				name: "模型",
				url: "/",
				icon: Brain,
			},
		]
	},
	{
		name: "通用",
		url: "/common",
		items: [
			{
				name: "设置",
				url: "/common/setting",
				icon: Settings,
			},
		],
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { pathname } = useLocation();
	const { theme, setTheme } = useTheme();

	return (
		<Sidebar variant="sidebar" collapsible="icon" {...props}>
			<SidebarHeader className="flex flex-row justify-between items-center">
				<div className="flex items-center space-x-2">
					<Logo />
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">
							状态
						</span>
						<span className="truncate text-xs">
							<StatusLight variant="success" />已连接
						</span>
					</div>
				</div>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="size-8 p-2 text-accent-foreground bg-accent hover:bg-primary hover:text-primary-foreground"
							size="icon"
							onClick={() =>
								theme === "dark" ? setTheme("light") : setTheme("dark")
							}
						>
							{theme === "dark" ? <Sun /> : <Moon />}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{theme === "dark" ? "亮色主题" : "暗色主题"}
					</TooltipContent>
				</Tooltip>
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
		</Sidebar>
	);
}
