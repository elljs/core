import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFullscreen } from 'ahooks';
import { Ellipsis, Expand, Moon, Shrink, Sun } from "lucide-react";
import { Navbar, NavbarItem } from "./navbar";
import { useTheme } from "./theme-provider";

export function NavHeader() {
    const { theme, setTheme } = useTheme();
    const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

    return (
        <header className="sticky top-0 flex items-center justify-between h-12 p-3 shadow-sm border-b bg-sidebar text-sidebar-foreground">
            <NavbarItem closeable={false} />
            <Navbar />
            <div className="flex justify-end items-center space-x-2 ml-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-7 w-7 text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon">
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Close current</DropdownMenuItem>
                        <DropdownMenuItem>Close others</DropdownMenuItem>
                        <DropdownMenuItem>Close all</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="h-7 w-7 text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" onClick={() => toggleFullscreen()}>
                            {isFullscreen ? <Shrink /> : <Expand />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Toggle full screen
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="h-7 w-7 text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
                            {theme === 'dark' ? <Sun /> : <Moon />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Toggle theme
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    );
}