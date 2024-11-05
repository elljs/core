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
import { useReactive } from "ahooks";
import {
	ArrowLeftToLine,
	ArrowRightToLine,
	Minus,
	RefreshCw,
	X
} from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface NavLink {
	name: string;
	url: string;
	icon?: JSX.Element;
	items?: NavLink[]
}

type NavbarContext = {
	defaultLink: NavLink;
	current: string;
	links: NavLink[];
	navigate: (link: NavLink) => void;
	refresh: (link: NavLink) => void;
	refreshCurrent: () => void;
	close: (link: NavLink) => void;
	closeCurrent: () => void;
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
	defaultLink,
	children,
}: React.ComponentProps<"div"> & {
	defaultLink: NavLink;
}) => {
	const state = useReactive<{
		links: NavLink[]
	}>({
		links: [],
	});
	const nav = useNavigate();
	const location = useLocation();
	const current = useMemo(() => {
		return location.pathname + location.search;
	}, [location.pathname, location.search]);
	// const { active, refresh, destroy, destroyAll, destroyOther, getCacheNodes } = useKeepAliveContext();
	useEffect(() => {
		state.links = defaultLink ? [defaultLink] : [];
	}, [defaultLink]);

	const contextValue = React.useMemo<NavbarContext>(
		() => {
			const navigate = (link: NavLink) => {
				nav(link.url);
				if (!state.links.some((l) => l.url === link.url)) {
					state.links = [...state.links, link];
				}
			};

			const refresh = (link: NavLink) => {

			};

			const refreshCurrent = () => {

			};

			const close = (link: NavLink) => {
				const index = state.links.findIndex((l) => l.url === link.url);
				const newLinks = [...state.links];
				newLinks.splice(index, 1);
				const nextLink = newLinks[index] ?? newLinks[newLinks.length - 1];
				state.links = newLinks;
				navigate(nextLink);
			};

			const closeCurrent = () => {
				if (current === defaultLink.url) return;
				close({ url: current } as NavLink);
			};

			const closeAll = () => {
				state.links = [defaultLink];
				navigate(defaultLink);
			};

			return ({
				defaultLink,
				current,
				links: state.links,
				navigate,
				refresh,
				refreshCurrent,
				close,
				closeCurrent,
				closeAll
			});
		},
		[nav, defaultLink, current, state.links],
	);

	return (
		<NavbarContext.Provider value={contextValue}>
			{children}
		</NavbarContext.Provider>
	);
};

NavbarProvider.displayName = "NavbarProvider";

function Navbar() {
	const { defaultLink, current, links, navigate, close } = useNavbar();
	console.log(links);

	return (
		<ScrollArea className="w-full">
			<nav className="flex flex-1 items-center space-x-2 h-12 overflow-auto">
				{
					links.map((link) => (
						<NavbarItem
							key={link.url}
							icon={link.icon}
							title={link.name}
							isActive={current === link.url}
							closeable={link.url !== defaultLink.url}
							onClick={() => {
								navigate(link);
							}}
							onClose={() => {
								close(link)
							}}
						/>
					))
				}
			</nav>
			<ScrollBar orientation="horizontal" />
		</ScrollArea >
	);
}

Navbar.diplayName = "Navbar";

function NavbarItem({
	className,
	icon: Icon,
	title,
	isActive = false,
	closeable = true,
	onClick = () => { },
	onClose = () => { },
}: React.HTMLAttributes<HTMLAnchorElement> & {
	icon?: JSX.Element,
	title: string,
	isActive?: boolean,
	closeable?: boolean,
	onClose?: () => void
}) {
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<a
					className={cn(
						"flex items-center cursor-pointer space-x-2 px-2 py-1 rounded-md bg-background text-foreground hover:bg-accent hover:text-accent-foreground min-w-[60px]",
						isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
						className,
					)}
					onClick={onClick}
				>
					{/* @ts-ignore */}
					{Icon && <Icon className="size-4" />}
					<span className="text-sm">{title}</span>
					{closeable && (
						<Button
							className={cn(
								"size-4 hover:bg-primary hover:text-primary-foreground",
								isActive && "hover:bg-background hover:text-foreground",
							)}
							size="icon"
							variant="ghost"
							onClick={(e) => {
								e.stopPropagation();
								onClose()
							}}
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
