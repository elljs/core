import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/nav-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useOutlet } from "react-router-dom";

export default function MainLayout() {
    const outlet = useOutlet();
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col flex-1">
                <NavHeader />
                <section className="flex-1 p-3 overflow-y-auto scrollbar-none">
                    {outlet}
                </section>
            </main>
        </SidebarProvider>
    )
}