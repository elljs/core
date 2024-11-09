import DocumentLayout from "@/layouts/document";
import MainLayout from "@/layouts/main";
import GeneralError from "@/pages/errors/general-error";
import MaintenanceError from "@/pages/errors/maintenance-error";
import NotFoundError from "@/pages/errors/not-found-error";
import UnauthorisedError from "@/pages/errors/unauthorised-error";
import { CirclePlay, Cpu, FilePenLine, FolderTree, LayoutDashboard, Receipt, Settings2 } from "lucide-react";
import { ReactNode } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

export type RouteMenu = { name: string, icon?: ReactNode, children?: RouteMenu[] } & RouteObject;

export const menus: RouteMenu[] = [
	{
		index: true,
		path: '/',
		name: "总览",
		icon: <LayoutDashboard />,
		lazy: async () => ({
			Component: (await import("@/pages/dashboard")).default,
		}),
	},
	// {
	// 	path: "/block",
	// 	name: "区块",
	// 	children: [
	// 		{
	// 			path: "customer",
	// 			name: "客户管理",
	// 			icon: <User2 />,
	// 			lazy: async () => ({
	// 				Component: (await import("@/pages/block/customer")).default,
	// 			}),
	// 		},
	// 	],
	// },
	{
		path: "/document",
		name: "文档",
		element: <DocumentLayout />,
		children: [
			{
				path: "getting-started",
				name: "快速开始",
				icon: <CirclePlay />,
				lazy: async () => ({
					Component: (await import("@/pages/document/getting-started")).default,
				}),
			},
		]
	},
	{
		path: "/component",
		name: "组件",
		children: [
			{
				path: "editor",
				name: "文本编辑器",
				icon: <FilePenLine />,
				lazy: async () => ({
					Component: (await import("@/pages/component/editor")).default,
				}),
			},
			{
				path: "llm",
				name: "大语言模型",
				icon: <Cpu />,
				lazy: async () => ({
					Component: (await import("@/pages/component/llm")).default,
				}),
			},
			{
				path: "pricing",
				name: "付费计划",
				icon: <Receipt />,
				lazy: async () => ({
					Component: (await import("@/pages/component/pricing")).default,
				}),
			},
			{
				path: "file-manager",
				name: "文件管理器",
				icon: <FolderTree />,
				lazy: async () => ({
					Component: (await import("@/pages/component/file-manager")).default,
				}),
			}
		],
	},
	{
		path: "/setting",
		name: "设置",
		icon: <Settings2 />,
		lazy: async () => ({
			Component: (await import("@/pages/setting")).default,
		}),
	},
]

const router = createBrowserRouter([
	{
		path: "/login",
		lazy: async () => ({
			Component: (await import("@/pages/auth/login")).default,
		}),
	},
	{
		path: "/",
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
