import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Navbar } from "./navbar";
import { useTheme } from "./theme-provider";

export function NavHeader() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 flex items-center justify-between h-12 w-full p-3 shadow-sm border-b bg-sidebar text-sidebar-foreground">
            <Navbar />
            <div className="flex justify-end items-center">
                <Button className="rounded-full h-7 w-7 text-sidebar-accent-foreground bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground" size="icon" onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
                    {theme === 'dark' ? <Sun /> : <Moon />}
                </Button>
            </div>
        </header>
    );
}