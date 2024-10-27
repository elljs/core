import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Home, X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
        <a className={cn("flex items-center cursor-pointer space-x-2 px-2 py-1 rounded-md bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)}>
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
            {closeable && <Button className="w-4 h-4 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" variant="ghost">
                <X />
            </Button>}
        </a>
    )
}

NavbarItem.displayName = "NavbarItem";

export {
    Navbar,
    NavbarProvider,
    useNavbar,
    NavbarItem
};
