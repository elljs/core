import { Button } from "@/components/ui/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
} from "@/components/ui/context-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@radix-ui/react-context-menu";
import {
	ArrowLeftToLine,
	ArrowRightToLine,
	Minus,
	RefreshCw,
	User,
	X
} from "lucide-react";
import React from "react";

type NavbarContext = {
	current: string;
	closeAll: () => void;
};

const NavbarContext = React.createContext<NavbarContext | null>(null);

function useNavbar() {
	const context = React.useContext(NavbarContext);
	if (!context) {
		throw new Error("useNavbar must be used within a NavbarProvider.");
	}

	return context;
}

const NavbarProvider = ({
	defaultNav,
	children,
}: React.ComponentProps<"div"> & {
	defaultNav?: string;
}) => {
	const contextValue = React.useMemo<NavbarContext>(
		() => ({
			current: defaultNav ?? "/",
			closeAll: () => { },
		}),
		[defaultNav],
	);

	return (
		<NavbarContext.Provider value={contextValue}>
			{children}
		</NavbarContext.Provider>
	);
};

NavbarProvider.displayName = "NavbarProvider";

function Navbar() {
	return (
		<ScrollArea className="w-full">
			<nav className="flex flex-1 items-center space-x-1 h-12 overflow-auto">
				<NavbarItem icon={<User className="size-4" />} title="客户管理" />
			</nav>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}

Navbar.diplayName = "Navbar";

function NavbarItem({
	className,
	icon,
	title,
	isActive = false,
	closeable = true,
}: React.HTMLAttributes<HTMLAnchorElement> & { icon: React.ReactNode, title: string, isActive?: boolean, closeable?: boolean }) {
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<a
					className={cn(
						"flex items-center cursor-pointer space-x-2 px-2 py-1 rounded-md bg-background text-foreground hover:bg-accent hover:text-accent-foreground min-w-[80px]",
						isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
						className,
					)}
				>
					{icon}
					<span className="text-sm">{title}</span>
					{closeable && (
						<Button
							className="size-4 hover:bg-primary hover:text-primary-foreground"
							size="icon"
							variant="ghost"
						>
							<X />
						</Button>
					)}
				</a>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>
					<RefreshCw className="size-4" />
					<span className="ml-1">刷新当前标签页</span>
				</ContextMenuItem>
				<ContextMenuSeparator className="w-full h-[1px] bg-border" />
				<ContextMenuItem>
					<ArrowLeftToLine className="size-4" />
					<span className="ml-1">关闭左侧标签页</span>
				</ContextMenuItem>
				<ContextMenuItem>
					<ArrowRightToLine className="size-4" />
					<span className="ml-1">关闭右侧标签页</span>
				</ContextMenuItem>
				<ContextMenuSeparator className="w-full h-[1px] bg-border" />
				<ContextMenuItem>
					<X className="size-4" />
					<span className="ml-1">关闭其他标签页</span>
				</ContextMenuItem>
				<ContextMenuItem>
					<Minus className="size-4" />
					<span className="ml-1">关闭全部标签页</span>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

NavbarItem.displayName = "NavbarItem";

export { Navbar, NavbarItem, NavbarProvider, useNavbar };
