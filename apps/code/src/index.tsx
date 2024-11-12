import { ModalProvider } from "@/components/custom/modal-provider";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<ThemeProvider defaultTheme="dark">
			<ModalProvider>
				<TooltipProvider>
					<RouterProvider router={router} />
				</TooltipProvider>
			</ModalProvider>
		</ThemeProvider>,
	);
}
