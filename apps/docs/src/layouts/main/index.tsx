import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/custom/sidebar";
import { useOutlet } from "react-router-dom";
import Header from "./components/header";
import UserInfo from "./components/user-info";
import { Home } from "lucide-react";
import { AccordionGroup } from "@/components/ui/accordion-group";
import { Accordion } from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion-item";
import { Button } from "react-aria-components";

const MainLayout = () => {
    const outlet = useOutlet();
    return (
        <div className="flex h-screen w-screen">
            <Sidebar>
                <SidebarHeader>
                </SidebarHeader>
                <SidebarContent>
                    {/* <SidebarGroup label="main">
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
                    </SidebarGroup> */}
                    <AccordionGroup>
                        <Accordion>
                            <AccordionItem>
                                <p>Personal information form here.</p>
                            </AccordionItem>
                            <h3>
                                <Button slot="trigger">
                                    <svg viewBox="0 0 24 24">
                                        <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                    Personal Information
                                </Button>
                            </h3>
                        </Accordion>
                    </AccordionGroup>
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
