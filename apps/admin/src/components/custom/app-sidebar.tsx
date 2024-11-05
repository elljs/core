import { Logo } from "@/components/custom/logo";
import { NavUser } from "@/components/custom/nav-user";
import { NavLink, useNavbar } from "@/components/custom/navbar";
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
import { useLocation } from "react-router-dom";

export function AppSidebar({ menus, ...props }: React.ComponentProps<typeof Sidebar> & { menus: NavLink[] }) {
	const { pathname } = useLocation();
	const { open, toggleSidebar } = useSidebar();
	const { navigate } = useNavbar();

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
							<div>
								<Logo />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{constants.name}
									</span>
									<span className="truncate text-xs">
										{constants.description}
									</span>
								</div>
							</div>
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
												<a className="cursor-pointer" onClick={() => navigate({
													icon: Icon,
													...item
												})}>
													{Icon && <Icon />}
													<span>{item.name}</span>
												</a>
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
										<a className="cursor-pointer" onClick={() => navigate({
											icon: Icon,
											...item
										})}>
											{Icon && <Icon />}
											<span>{item.name}</span>
										</a>
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
