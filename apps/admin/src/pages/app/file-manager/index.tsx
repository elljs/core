import { ChevronRight, File, Folder } from "lucide-react";

import { Page } from "@/components/custom/page";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub
} from "@/components/ui/sidebar";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area";

// This is sample data.
const data = {
	changes: [
		{
			file: "README.md",
			state: "M",
		},
		{
			file: "api/hello/route.ts",
			state: "U",
		},
		{
			file: "app/layout.tsx",
			state: "M",
		},
	],
	tree: [
		[
			"app",
			[
				"api",
				["hello", ["route.ts"]],
				"page.tsx",
				"layout.tsx",
				["blog", ["page.tsx"]],
			],
		],
		[
			"components",
			["ui", "button.tsx", "card.tsx"],
			"header.tsx",
			"footer.tsx",
		],
		["lib", ["util.ts"]],
		["public", "favicon.ico", "vercel.svg"],
		".eslintrc.json",
		".gitignore",
		"next.config.js",
		"tailwind.config.js",
		"package.json",
		"README.md",
	],
};

export default function FileManager() {
	return (
		<Page className="flex flex-col pb-4" header="文件管理器">
			<ResizablePanelGroup className="rounded border shadow bg-card" direction="horizontal">
				<ResizablePanel defaultSize={20} minSize={10}>
					<ScrollArea className="h-full overflow-auto">
						<SidebarGroup>
							<SidebarGroupLabel>Changes</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{data.changes.map((item, index) => (
										<SidebarMenuItem key={index}>
											<SidebarMenuButton>
												<File />
												{item.file}
											</SidebarMenuButton>
											<SidebarMenuBadge>{item.state}</SidebarMenuBadge>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<SidebarGroup>
							<SidebarGroupLabel>Files</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{data.tree.map((item, index) => (
										<Tree key={index} item={item} />
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</ScrollArea>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel minSize={50} className="p-2">
					Content
				</ResizablePanel>
			</ResizablePanelGroup>
		</Page >
	);
}

function Tree({ item }: { item: string | any[] }) {
	const [name, ...items] = Array.isArray(item) ? item : [item];

	if (!items.length) {
		return (
			<SidebarMenuButton
				isActive={name === "button.tsx"}
				className="data-[active=true]:bg-transparent"
			>
				<File />
				{name}
			</SidebarMenuButton>
		);
	}

	return (
		<SidebarMenuItem>
			<Collapsible
				className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				defaultOpen={name === "components" || name === "ui"}
			>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton>
						<ChevronRight className="transition-transform" />
						<Folder />
						{name}
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{items.map((subItem, index) => (
							<Tree key={index} item={subItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</Collapsible>
		</SidebarMenuItem>
	);
}
