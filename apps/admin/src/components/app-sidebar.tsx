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
	ChevronLeft,
	ChevronRight
} from "lucide-react";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
	name: string;
	url: string;
	icon?: React.ReactNode;
	items?: MenuItem[]
}

export function AppSidebar({ menus, ...props }: React.ComponentProps<typeof Sidebar> & { menus: MenuItem[] }) {
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
				{menus.map((item) => {
					if (item.items && item.items.length > 0) {
						return (
							<SidebarGroup key={item.url}>
								<SidebarGroupLabel>{item.name}</SidebarGroupLabel>
								<SidebarMenu>
									{item.items.map((item) => (
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
													{item.icon}
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
											{item.icon}
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
