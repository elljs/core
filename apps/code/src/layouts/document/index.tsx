import { CodeHike } from "@/components/custom/code-hike/code-hike";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail
} from "@/components/ui/sidebar";
import { MDXProvider } from "@mdx-js/react";
import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";

/** @type {MDXComponents} */
const components = {
	CodeHike,
};

function observeAnchor() {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const { id } = entry.target;
				const tocLinkEl = document.querySelector(`.toc a[href='#${id}']`);
				if (!tocLinkEl) return;
				if (entry.isIntersecting) {
					document
						.querySelectorAll(".toc a")
						.forEach((e) => e.classList.remove("active"));
					tocLinkEl.classList.add("active");
				}
			}
		},
		{
			threshold: 1,
			rootMargin: "0px 0px -66%",
		},
	);
	const elToObserve = document.querySelectorAll(
		"article :is(h1,h2,h3,h4,h5,h6)",
	);
	elToObserve.forEach((el) => observer.observe(el));
	return observer;
}

// This is sample data.
const data = {
	navMain: [
		{
			title: "Getting Started",
			url: "#",
			items: [
				{
					title: "Installation",
					url: "#",
				},
				{
					title: "Project Structure",
					url: "#",
				},
			],
		},
		{
			title: "Building Your Application",
			url: "#",
			items: [
				{
					title: "Routing",
					url: "#",
				},
				{
					title: "Data Fetching",
					url: "#",
					isActive: true,
				},
				{
					title: "Rendering",
					url: "#",
				},
				{
					title: "Caching",
					url: "#",
				},
				{
					title: "Styling",
					url: "#",
				},
				{
					title: "Optimizing",
					url: "#",
				},
				{
					title: "Configuring",
					url: "#",
				},
				{
					title: "Testing",
					url: "#",
				},
				{
					title: "Authentication",
					url: "#",
				},
				{
					title: "Deploying",
					url: "#",
				},
				{
					title: "Upgrading",
					url: "#",
				},
				{
					title: "Examples",
					url: "#",
				},
			],
		},
		{
			title: "API Reference",
			url: "#",
			items: [
				{
					title: "Components",
					url: "#",
				},
				{
					title: "File Conventions",
					url: "#",
				},
				{
					title: "Functions",
					url: "#",
				},
				{
					title: "next.config.js Options",
					url: "#",
				},
				{
					title: "CLI",
					url: "#",
				},
				{
					title: "Edge Runtime",
					url: "#",
				},
			],
		},
		{
			title: "Architecture",
			url: "#",
			items: [
				{
					title: "Accessibility",
					url: "#",
				},
				{
					title: "Fast Refresh",
					url: "#",
				},
				{
					title: "Next.js Compiler",
					url: "#",
				},
				{
					title: "Supported Browsers",
					url: "#",
				},
				{
					title: "Turbopack",
					url: "#",
				},
			],
		},
		{
			title: "Community",
			url: "#",
			items: [
				{
					title: "Contribution Guide",
					url: "#",
				},
			],
		},
	],
}

export default function Document() {

	const documentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		setTimeout(() => {
			observeAnchor();
		}, 300);
	}, [documentRef.current]);

	return (
		<div className="relative flex h-layout w-full justify-center bg-card overflow-y-hidden">
			<aside className="flex flex-col justify-end w-[300px] px-4 pt-2 pb-20 box-border overflow-y-hidde">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild>
								<a href="#">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<GalleryVerticalEnd className="size-4" />
									</div>
									<div className="flex flex-col gap-0.5 leading-none">
										<span className="font-semibold">Documentation</span>
										<span className="">v1.0.0</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url} className="font-medium">
											{item.title}
										</a>
									</SidebarMenuButton>
									{item.items?.length ? (
										<SidebarMenuSub>
											{item.items.map((item) => (
												<SidebarMenuSubItem key={item.title}>
													<SidebarMenuSubButton asChild isActive={item.isActive}>
														<a href={item.url}>{item.title}</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									) : null}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarRail />
			</aside>
			<main
				id="document"
				className="relative box-border overflow-y-hidden pr-[400px]"
			>
				<div
					className="h-layout mx-8 p-4 pb-20 box-border overflow-y-auto no-scrollbar">
					<Breadcrumb className="mb-4">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/components">Components</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<MDXProvider
						components={components}>
						<article
							ref={documentRef}
							className="prose dark:prose-invert min-w-prose"
						>
							<Outlet />
						</article>
					</MDXProvider>
				</div>
			</main>
		</div>
	);
}
