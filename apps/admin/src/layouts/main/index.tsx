import {
	AbilityProvider,
	AppAbility,
} from "@/components/custom/ability-provider";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { NavHeader } from "@/components/custom/nav-header";
import { NavLink, NavbarProvider } from "@/components/custom/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import globalModel from "@/models/global.model";
import { RouteMenu, menus } from "@/router";
import { RawRuleOf } from "@casl/ability";
import KeepAlive, { useKeepaliveRef } from "keepalive-for-react";
import { LoaderCircle } from "lucide-react";
import { Suspense, useMemo } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { useSnapshot } from "valtio";

function getLinks(menus: RouteMenu[], parent?: RouteMenu) {
	const links: NavLink[] = [];

	for (const menu of menus) {
		if (menu.children && menu.children.length > 0) {
			links.push({
				name: menu.name,
				url: menu.path!,
				icon: menu.icon,
				items: getLinks(menu.children, menu),
			});
		} else {
			links.push({
				name: menu.name,
				url: parent ? [parent?.path, menu.path!].join("/") : menu.path!,
				icon: menu.icon,
			});
		}
	}

	return links;
}

function searchIcon(links: NavLink[], link: NavLink): React.ReactNode | null {
	for (const l of links) {
		if (l.url === link.url) {
			return l.icon;
		}

		if (l.items && l.items.length > 0) {
			const icon = searchIcon(l.items, link);
			if (icon) {
				return icon;
			}
		}
	}

	return null;
}

export default function MainLayout() {
	const location = useLocation();
	const aliveRef = useKeepaliveRef();
	const outlet = useOutlet();
	const { permissions } = useSnapshot(globalModel.state);

	const currentCacheKey = useMemo(() => {
		return location.pathname + location.search;
	}, [location.pathname, location.search]);

	const links = useMemo(() => {
		return getLinks(menus);
	}, [menus]);

	return (
		<AbilityProvider rules={permissions as RawRuleOf<AppAbility>[]}>
			<NavbarProvider
				aliveRef={aliveRef}
				current={currentCacheKey}
				defaultLink={links[0]}
				getLinkIcon={(link) => {
					return (
						<span className="[&>svg]:size-4">{searchIcon(links, link)}</span>
					);
				}}
			>
				<SidebarProvider>
					<AppSidebar menus={links} />
					<div className="w-full h-screen overflow-x-hidden bg-accent text-accent-foreground">
						<NavHeader />
						<main className="h-layout">
							<KeepAlive
								transition
								aliveRef={aliveRef}
								activeCacheKey={currentCacheKey}
								max={18}
							>
								<Suspense
									fallback={
										<div className="flex justify-center items-center bg-secondary p-10">
											<LoaderCircle className="animate-spin" />
										</div>
									}
								>
									{outlet}
								</Suspense>
							</KeepAlive>
						</main>
					</div>
				</SidebarProvider>
			</NavbarProvider>
		</AbilityProvider>
	);
}
