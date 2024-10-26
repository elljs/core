import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main";

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
		],
	},
]);

export default router;
