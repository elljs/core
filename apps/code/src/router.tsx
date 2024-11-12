import MainLayout from "@/layouts/main";
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
				path: "/",
				lazy: async () => ({
					Component: (await import("@/pages/workspace")).default,
				}),
			},
			{
				path: "/setting",
				lazy: async () => ({
					Component: (await import("@/pages/setting")).default,
				}),
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
