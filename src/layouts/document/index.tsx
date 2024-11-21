import { CodeHike } from "@/components/custom/code-hike/code-hike";
import { useTheme } from "@/components/custom/theme-provider";
import { Button } from "@/components/ui/button";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from "@/components/ui/sidebar";
import { MDXProvider } from "@mdx-js/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar";
import { Search } from "./components/search";
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

const links = [
	{
		title: "Getting Started",
		url: "/docs",
		items: [
			{
				title: "Installation",
				url: "/docs",
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
]

export default function Document() {
	const { theme, setTheme } = useTheme();
	const documentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		setTimeout(() => {
			observeAnchor();
		}, 300);
	}, [documentRef.current]);

	return (
		<SidebarProvider>
			<AppSidebar links={links} />
			<SidebarInset>
				<header className="sticky top-0 flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
					<SidebarTrigger />
					<div className="flex items-center space-x-1">
						<Search />
						<Button className="size-8 p-2" variant="ghost" size="icon">
							<GitHubLogoIcon className="!size-5" />
						</Button>
						<Button
							className="size-8 p-2" variant="ghost" size="icon"
							onClick={() =>
								theme === "dark" ? setTheme("light") : setTheme("dark")
							}
						>
							{theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
						</Button>
					</div>
				</header>
				<MDXProvider
					components={components}>
					<main
						id="document"
						ref={documentRef}
						className="min-h-[100vh] flex flex-1 rounded-xl md:min-h-min py-4 px-10"
					>
						<article className="flex-1 prose dark:prose-invert">
							<Outlet />
						</article>
						<aside className="w-64">

						</aside>
					</main>
				</MDXProvider>
			</SidebarInset>
		</SidebarProvider>
	);
}
