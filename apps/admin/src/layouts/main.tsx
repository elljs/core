import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/custom/nav-header";
import { NavbarProvider } from "@/components/custom/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KeepAliveRouteOutlet } from "keepalive-for-react";

export default function MainLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full h-screen overflow-x-hidden bg-accent text-accent-foreground">
				<NavbarProvider>
					<NavHeader />
				</NavbarProvider>
				<main className="h-layout">
					<KeepAliveRouteOutlet transition />
				</main>
			</div>
		</SidebarProvider>
	);
}
