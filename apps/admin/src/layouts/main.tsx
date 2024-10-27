import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/nav-header";
import { NavbarProvider } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useOutlet } from "react-router-dom";

export default function MainLayout() {
    const outlet = useOutlet();
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full h-screen overflow-x-hidden">
                <NavbarProvider>
                    <NavHeader />
                </NavbarProvider>
                <main className="flex-1 p-3 bg-background">
                    {outlet}
                </main>
            </div>
        </SidebarProvider>
    )
}