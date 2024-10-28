import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/main";

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
				path: 'setting',
				lazy: async () => ({
					Component: (await import("@/pages/setting")).default,
				}),
			},
		],
	},
]);

export default router;
