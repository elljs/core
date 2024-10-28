import { AppSidebar } from "@/components/custom/app-sidebar";
import { NavHeader } from "@/components/custom/nav-header";
import { NavbarProvider } from "@/components/custom/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KeepAliveRouteOutlet } from "keepalive-for-react";

export default function MainLayout() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full h-screen overflow-x-hidden">
                <NavbarProvider>
                    <NavHeader />
                </NavbarProvider>
                <main className="flex-1 p-3 bg-secondary">
                    <KeepAliveRouteOutlet transition />
                </main>
            </div>
        </SidebarProvider>
    )
}