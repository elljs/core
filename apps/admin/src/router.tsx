import MainLayout from "@/layouts/main";
import SettingLayout from "@/layouts/setting";
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
							Component: (await import("@/pages/setting/platform")).default,
						}),
					},
				],
			},
		],
	},
]);

export default router;
