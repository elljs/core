import { CodeHike } from "@/components/custom/code-hike/code-hike";
import HoverContainer from "@/components/custom/code-hike/hover-container";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "@/components/ui/sidebar";
import { MDXProvider } from "@mdx-js/react";
import { ChevronRight, File, Folder } from "lucide-react";
import Code from './code.mdx';
import Content from './content.mdx';
import "./index.css";
import Link from "@/components/custom/code-hike/link";

const data = {
	changes: [
		{
			file: "README.md",
			state: "M",
		},
		{
			file: "src/main.ai",
			state: "U",
		},
	],
	tree: [
		[
			"src",
			[
				"main.ai",
			],
		],
		"README.md",
	],
};

/** @type {MDXComponents} */
const components = {
	HoverContainer,
	a: Link,
	CodeHike,
};

export default function Script() {
	return (
		<MDXProvider
			components={components}>
			<ResizablePanelGroup
				className="!h-layout box-border overflow-hidden bg-card"
				direction="horizontal"
			>
				<ResizablePanel defaultSize={15} minSize={10}>
					<ScrollArea className="h-layout overflow-auto">
						<SidebarGroup>
							<SidebarGroupLabel>变更</SidebarGroupLabel>
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
							<SidebarGroupLabel>文件</SidebarGroupLabel>
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
				<ResizablePanel defaultSize={45} minSize={20}>
					<ScrollArea className="h-layout prose dark:prose-invert min-w-full overflow-auto bg-[var(--tw-prose-pre-bg)]">
						<Content />
					</ScrollArea>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={40} minSize={20}>
					<ScrollArea className="h-layout prose dark:prose-invert min-w-full overflow-auto bg-[var(--tw-prose-pre-bg)]">
						<Code />
					</ScrollArea>
				</ResizablePanel>
			</ResizablePanelGroup>
		</MDXProvider>
	);
}

function Tree({ item }: { item: string | any[] }) {
	const [name, ...items] = Array.isArray(item) ? item : [item];

	if (!items.length) {
		return (
			<SidebarMenuButton
				isActive={name === "main.ai"}
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
				defaultOpen={name === "src"}
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
