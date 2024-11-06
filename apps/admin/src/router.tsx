import MainLayout from "@/layouts/main";
import SettingLayout from "@/layouts/setting";
import GeneralError from "@/pages/errors/general-error";
import MaintenanceError from "@/pages/errors/maintenance-error";
import NotFoundError from "@/pages/errors/not-found-error";
import UnauthorisedError from "@/pages/errors/unauthorised-error";
import { createBrowserRouter } from "react-router-dom";

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
		children: [
			{
				index: true,
				lazy: async () => ({
					Component: (await import("@/pages/home")).default,
				}),
			},
			{
				path: "/block",
				children: [
					{
						path: "customer",
						lazy: async () => ({
							Component: (await import("@/pages/block/customer")).default,
						}),
					},
				],
			},
			{
				path: "/component",
				children: [
					{
						path: "editor",
						lazy: async () => ({
							Component: (await import("@/pages/component/editor")).default,
						}),
					},
					{
						path: "file-manager",
						lazy: async () => ({
							Component: (await import("@/pages/component/file-manager")).default,
						}),
					},
					{
						path: "llm",
						lazy: async () => ({
							Component: (await import("@/pages/component/llm")).default,
						}),
					},
				],
			},
			{
				path: "/setting",
				element: <SettingLayout />,
				children: [
					{
						index: true,
						lazy: async () => ({
							Component: (await import("@/pages/setting/profile")).default,
						}),
					},
					{
						path: "system",
						lazy: async () => ({
							Component: (await import("@/pages/setting/system")).default,
						}),
					},
					{
						path: "appearance",
						lazy: async () => ({
							Component: (await import("@/pages/setting/appearance")).default,
						}),
					},
				],
			},
		],
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
