import AILayout from "@/layouts/ai";
import DocumentLayout from "@/layouts/document";
import HomeLayout from "@/layouts/home";
import MainLayout from "@/layouts/main";
import GeneralError from "@/pages/errors/general-error";
import MaintenanceError from "@/pages/errors/maintenance-error";
import NotFoundError from "@/pages/errors/not-found-error";
import UnauthorisedError from "@/pages/errors/unauthorised-error";
import {
	Bot,
	CirclePlay,
	Cpu,
	FilePenLine,
	FolderTree,
	LayoutDashboard,
	LayoutGrid,
	MessageSquareCode,
	Receipt,
	Settings2,
	SquareFunction
} from "lucide-react";
import { ReactNode } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

export type RouteMenu = {
	name: string;
	icon?: ReactNode;
	children?: RouteMenu[];
} & RouteObject;

export const menus: RouteMenu[] = [
	{
		index: true,
		path: "/admin",
		name: "总览",
		icon: <LayoutDashboard />,
		lazy: async () => ({
			Component: (await import("@/pages/admin/dashboard")).default,
		}),
	},
	{
		path: '/admin/ai',
		name: 'AI',
		element: <AILayout />,
		children: [
			{
				path: 'script',
				name: '自然语言工程',
				icon: <MessageSquareCode />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/ai/script")).default,
				}),
			},
			{
				path: 'chat-bot',
				name: '聊天机器人',
				icon: <Bot />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/ai/bot")).default,
				}),
			}
		]
	},
	{
		path: "/admin/component",
		name: "组件",
		children: [
			{
				path: "editor",
				name: "文本编辑器",
				icon: <FilePenLine />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/component/editor")).default,
				}),
			},
			{
				path: "llm",
				name: "大语言模型",
				icon: <Cpu />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/component/llm")).default,
				}),
			},
			{
				path: "pricing",
				name: "付费计划",
				icon: <Receipt />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/component/pricing")).default,
				}),
			},
			{
				path: "file-manager",
				name: "文件管理器",
				icon: <FolderTree />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/component/file-manager")).default,
				}),
			},
			{
				path: 'openapi',
				name: '接口文档',
				icon: <SquareFunction />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/component/openapi")).default,
				})
			}
		],
	},
	{
		path: "/admin/app",
		name: "集成",
		children: [
			{
				path: "integration",
				name: "第三方应用",
				icon: <LayoutGrid />,
				lazy: async () => ({
					Component: (await import("@/pages/admin/app/integration")).default,
				}),
			},
		],
	},
	{
		path: "/admin/setting",
		name: "设置",
		icon: <Settings2 />,
		lazy: async () => ({
			Component: (await import("@/pages/admin/setting")).default,
		}),
	},
];

const router = createBrowserRouter([
	{
		path: "/login",
		lazy: async () => ({
			Component: (await import("@/pages/auth/login")).default,
		}),
	},
	{
		path: "/",
		element: <HomeLayout />,
		children: [
			{
				index: true,
				lazy: async () => ({
					Component: (await import("@/pages/home")).default,
				})
			}
		]
	},
	{
		path: "/docs",
		name: "文档",
		element: <DocumentLayout />,
		children: [
			{
				path: "getting-started",
				name: "快速开始",
				icon: <CirclePlay />,
				lazy: async () => ({
					Component: (await import("@/pages/docs/index.mdx")).default,
				}),
			},
		],
	},
	{
		path: "/admin",
		element: <MainLayout />,
		children: menus,
	},

	// Error routes
	{ path: "/500", Component: GeneralError },
	{ path: "/404", Component: NotFoundError },
	{ path: "/503", Component: MaintenanceError },
	{ path: "/401", Component: UnauthorisedError },

	// Fallback 404 route
	{ path: "*", Component: NotFoundError },
]);

export default router;
