import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFullscreen } from 'ahooks';
import { Ellipsis, Expand, Minus, Moon, RefreshCw, Shrink, Sun, X } from "lucide-react";
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
                        <DropdownMenuItem>
                            <X />
                            <span>关闭当前标签页</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Minus />
                            <span>关闭全部标签页</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="h-7 w-7 text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" onClick={() => {

                        }}>
                            <RefreshCw />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        刷新当前标签页
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="h-7 w-7 text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" onClick={() => toggleFullscreen()}>
                            {isFullscreen ? <Shrink /> : <Expand />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {isFullscreen ? '退出全屏' : '进入全屏'}
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="h-7 w-7 text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
                            {theme === 'dark' ? <Sun /> : <Moon />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {theme === 'dark' ? '亮色主题' : '暗色主题'}
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    );
}