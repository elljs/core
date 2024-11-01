import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KeepAliveRouteOutlet } from "keepalive-for-react";
import { Ollama } from 'ollama/browser';
import { useEffect } from "react";

export default function MainLayout() {

	useEffect(() => {
		const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });
		ollama.ps().catch(console.error);
	}, []);

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full h-screen p-3 overflow-x-hidden bg-accent text-accent-foreground">
				<KeepAliveRouteOutlet transition />
			</main>
		</SidebarProvider>
	);
}
