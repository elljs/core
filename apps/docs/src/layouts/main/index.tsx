import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/custom/sidebar";
import { useOutlet } from "react-router-dom";
import Header from "./components/header";
import UserInfo from "./components/user-info";
import { Home } from "lucide-react";

const MainLayout = () => {
    const outlet = useOutlet();
    return (
        <div className="flex h-screen w-screen">
            <Sidebar>
                <SidebarHeader>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup label="main">
                        <SidebarMenu>
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup label="pages">
                        <SidebarMenu>
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup label="components">
                        <SidebarMenu>
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup label="apps">
                        <SidebarMenu>
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                            <SidebarMenuItem icon={<Home className="w-5 h-5" />} label="Home" />
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <UserInfo />
                </SidebarFooter>
            </Sidebar>
            <div className="flex flex-col flex-1">
                <Header />
                <main className={"flex-1 p-3 overflow-y-auto scrollbar-none transition-all ease-in-out duration-300"}>
                    {outlet}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
