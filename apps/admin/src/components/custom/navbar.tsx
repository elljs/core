import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ContextMenuSeparator, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { ArrowLeftToLine, ArrowRightToLine, Home, Minus, RefreshCw, X } from "lucide-react";
import React from "react";

type NavbarContext = {
    current: string;
    closeAll: () => void;
}

const NavbarContext = React.createContext<NavbarContext | null>(null);

function useNavbar() {
    const context = React.useContext(NavbarContext)
    if (!context) {
        throw new Error("useNavbar must be used within a NavbarProvider.")
    }

    return context
}

const NavbarProvider = ({ defaultNav, children }: React.ComponentProps<"div"> & {
    defaultNav?: string
}) => {
    const contextValue = React.useMemo<NavbarContext>(
        () => ({
            current: defaultNav ?? '/',
            closeAll: () => { },
        }),
        [defaultNav]
    );

    return (
        <NavbarContext.Provider value={contextValue}>
            {children}
        </NavbarContext.Provider>
    )
}

NavbarProvider.displayName = "NavbarProvider"

function Navbar() {

    return (
        <ScrollArea>
            <nav className="flex flex-1 items-center space-x-1 h-12 overflow-auto">
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
            </nav>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

Navbar.diplayName = "Navbar";

function NavbarItem({ className, closeable = true }: React.HTMLAttributes<HTMLAnchorElement> & { closeable?: boolean }) {

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <a className={cn("flex items-center cursor-pointer space-x-2 px-2 py-1 rounded-md bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)}>
                    <Home className="w-4 h-4" />
                    <span className="text-sm">Home</span>
                    {closeable && <Button className="w-4 h-4 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" variant="ghost">
                        <X />
                    </Button>}
                </a>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-xs ml-1">刷新当前标签页</span>
                </ContextMenuItem>
                <ContextMenuSeparator className="w-full h-[1px] bg-border" />
                <ContextMenuItem>
                    <ArrowLeftToLine className="w-4 h-4" />
                    <span className="text-xs ml-1">关闭左侧标签页</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <ArrowRightToLine className="w-4 h-4" />
                    <span className="text-xs ml-1">关闭右侧标签页</span>
                </ContextMenuItem>
                <ContextMenuSeparator className="w-full h-[1px] bg-border" />
                <ContextMenuItem>
                    <X className="w-4 h-4" />
                    <span className="text-xs ml-1">关闭其他标签页</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Minus className="w-4 h-4" />
                    <span className="text-xs ml-1">关闭全部标签页</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

NavbarItem.displayName = "NavbarItem";

export {
    Navbar, NavbarItem, NavbarProvider,
    useNavbar
};

