import MainLayout from "@/layouts/main";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/login",
		lazy: async () => ({
			Component: (await import("@/pages/login")).default,
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
				path: "app",
				children: [
					{
						path: "editor",
						lazy: async () => ({
							Component: (await import("@/pages/app/editor")).default,
						}),
					},
					{
						path: "file-manager",
						lazy: async () => ({
							Component: (await import("@/pages/app/file-manager")).default,
						}),
					},
					{
						path: "bot",
						lazy: async () => ({
							Component: (await import("@/pages/app/bot")).default,
						}),
					},
				],
			},
			{
				path: "operation",
				children: [
					{
						path: "customer",
						lazy: async () => ({
							Component: (await import("@/pages/operation/customer")).default,
						}),
					},
				],
			},
			{
				path: "setting",
				children: [
					{
						path: "platform",
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
