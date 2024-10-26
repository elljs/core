import "./index.css";

import { ThemeProvider } from "@/components/custom/theme-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SidebarProvider } from "./components/custom/sidebar";
import constants from "./constants";
import router from "./router";

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<ThemeProvider defaultTheme="light" storageKey={`${constants.name}-theme}`}>
				<SidebarProvider>
					<RouterProvider router={router} />
				</SidebarProvider>
			</ThemeProvider>
		</React.StrictMode>,
	);
}
