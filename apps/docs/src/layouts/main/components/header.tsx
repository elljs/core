import { SidebarTrigger } from "@/components/custom/sidebar";
import { useTheme } from "@/components/custom/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Header = () => {
    const { theme, setTheme } = useTheme();

    return <header className={"position-sticky top-0 flex items-center justify-between h-14 w-full p-3 shadow-sm border-b bg-background"}>
        <SidebarTrigger />
        <div className="flex-1 flex justify-end items-center">
            <Button className="rounded-full" variants={{ size: 'icon', variant: 'ghost' }} onPress={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
        </div>
    </header>
}

export default Header;