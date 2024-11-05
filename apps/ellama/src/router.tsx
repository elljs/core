import MainLayout from "@/layouts/main";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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
				path: "common",
				children: [
					{
						path: 'setting',
						lazy: async () => ({
							Component: (await import("@/pages/common/setting")).default,
						}),
					},
				]
			},
		],
	},
]);

export default router;
