import { Button } from "@/components/ui/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
} from "@/components/ui/context-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import constants from "@/constants";
import { cn } from "@/lib/utils";
import {
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@radix-ui/react-context-menu";
import { useReactive } from "ahooks";
import { KeepAliveRef } from "keepalive-for-react";
import {
	ArrowLeftToLine,
	ArrowRightToLine,
	Minus,
	RefreshCw,
	X
} from "lucide-react";
import React, { MutableRefObject, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface NavLink {
	name: string;
	url: string;
	icon?: React.ReactNode;
	items?: NavLink[]
}

type NavbarContext = {
	aliveRef: MutableRefObject<KeepAliveRef | undefined>;
	defaultLink: NavLink;
	current: string;
	links: NavLink[];
	getLinkIcon: (link: NavLink) => React.ReactNode;
	navigate: (link: NavLink) => void;
	refresh: (link: NavLink) => void;
	refreshCurrent: () => void;
	close: (link: NavLink) => void;
	closeCurrent: () => void;
	closeLeft: (link: NavLink) => void;
	closeRight: (link: NavLink) => void;
	closeOther: (link: NavLink) => void;
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

const loadLinksFromLocalStorage = (defaultLink: NavLink) => {
	const storedLinks = localStorage.getItem(
		`${constants.localStorageKeyPrefix}-navbar-links`,
	);
	let links = [];
	if (storedLinks) {
		try {
			links = JSON.parse(storedLinks);
		} catch (error) {
			links = [defaultLink];
		}
	}
	if (!links.length) {
		links = [defaultLink];
	}

	return links;
}

const saveLinksToLocalStorage = (links: NavLink[]) => {
	localStorage.setItem(
		`${constants.localStorageKeyPrefix}-navbar-links`,
		JSON.stringify(links),
	);
}

const NavbarProvider = ({
	aliveRef,
	current,
	defaultLink,
	getLinkIcon,
	children,
}: React.ComponentProps<"div"> & {
	aliveRef: MutableRefObject<KeepAliveRef | undefined>,
	current: string;
	defaultLink: NavLink;
	getLinkIcon: (link: NavLink) => React.ReactNode;
}) => {
	const state = useReactive<{
		links: NavLink[]
	}>({
		links: [],
	});
	const nav = useNavigate();

	useEffect(() => {
		state.links = loadLinksFromLocalStorage(defaultLink);
	}, [defaultLink]);

	useEffect(() => {
		saveLinksToLocalStorage(state.links);
	}, [state.links]);

	const contextValue = React.useMemo<NavbarContext>(
		() => {
			const navigate = (link: NavLink) => {
				nav(link.url);
				if (!state.links.some((l) => l.url === link.url)) {
					state.links = [...state.links, link];
				}
			};

			const refresh = (link: NavLink) => {
				aliveRef.current?.refresh(link.url);
			};

			const refreshCurrent = () => {
				aliveRef.current?.refresh();
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

			const closeLeft = (link: NavLink) => {
				const currentIndex = state.links.findIndex((l) => l.url === current);
				const index = state.links.findIndex((l) => l.url === link.url);
				state.links = state.links.filter((_, i) => i >= index || i === 0);
				if (currentIndex < index) {
					navigate(link);
				}
			};

			const closeRight = (link: NavLink) => {
				const currentIndex = state.links.findIndex((l) => l.url === current);
				const index = state.links.findIndex((l) => l.url === link.url);
				state.links = state.links.filter((_, i) => i <= index || i === 0);
				if (currentIndex > index) {
					navigate(link);
				}
			};

			const closeOther = (link: NavLink) => {
				const newLinks = state.links.filter((l) => l.url === link.url);
				state.links = link.url === defaultLink.url ? [...newLinks] : [defaultLink, ...newLinks];
				navigate(link);
			};

			const closeAll = () => {
				state.links = [defaultLink];
				navigate(defaultLink);
			};

			return ({
				aliveRef,
				defaultLink,
				current,
				links: state.links,
				getLinkIcon,
				navigate,
				refresh,
				refreshCurrent,
				close,
				closeCurrent,
				closeLeft,
				closeRight,
				closeOther,
				closeAll
			});
		},
		[aliveRef, nav, defaultLink, current, state.links, getLinkIcon],
	);

	return (
		<NavbarContext.Provider value={contextValue}>
			{children}
		</NavbarContext.Provider>
	);
};

NavbarProvider.displayName = "NavbarProvider";

function Navbar() {
	const { defaultLink, current, links, getLinkIcon, navigate, close } = useNavbar();

	return (
		<ScrollArea className="w-full">
			<nav className="flex flex-1 items-center space-x-2 h-12 overflow-auto">
				{
					links.map((link) => (
						<NavbarItem
							key={link.url}
							icon={getLinkIcon(link)}
							name={link.name}
							url={link.url}
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
	isActive = false,
	closeable = true,
	onClick = () => { },
	onClose = () => { },
	...link
}: React.HTMLAttributes<HTMLAnchorElement> & NavLink & {
	isActive?: boolean,
	closeable?: boolean,
	onClose?: () => void,
}) {
	const { defaultLink, refresh, close, closeLeft, closeRight, closeOther } = useNavbar();

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
					{link.icon}
					<span className="text-sm">{link.name}</span>
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
				<ContextMenuItem onClick={() => { refresh(link) }}>
					<RefreshCw className="size-4" />
					<span className="ml-1">刷新当前标签页</span>
				</ContextMenuItem>
				{link.url !== defaultLink.url && <>
					<ContextMenuSeparator className="w-full h-[1px] bg-border" />
					<ContextMenuItem onClick={() => closeLeft(link)}>
						<ArrowLeftToLine className="size-4" />
						<span className="ml-1">关闭左侧标签页</span>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => closeRight(link)}>
						<ArrowRightToLine className="size-4" />
						<span className="ml-1">关闭右侧标签页</span>
					</ContextMenuItem>
				</>}
				<ContextMenuSeparator className="w-full h-[1px] bg-border" />
				<ContextMenuItem onClick={() => closeOther(link)}>
					<Minus className="size-4" />
					<span className="ml-1">关闭其他标签页</span>
				</ContextMenuItem>
				{link.url !== defaultLink.url && <ContextMenuItem onClick={() => close(link)}>
					<X className="size-4" />
					<span className="ml-1">关闭当前标签页</span>
				</ContextMenuItem>}
			</ContextMenuContent>
		</ContextMenu>
	);
}

NavbarItem.displayName = "NavbarItem";

export { Navbar, NavbarItem, NavbarProvider, useNavbar };
