import "./index.css";

import { ThemeProvider } from "@/components/theme-provider";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}
