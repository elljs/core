import { cn } from "@/lib/utils";
import { Bot, Files, Search, Settings } from "lucide-react";
import { ReactNode } from "react";

interface MenuItemProps {
    id: string;
    title?: string;
    icon: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}

const MenuItem = ({ title, icon, isActive, onClick }: MenuItemProps) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center p-2 size-12 box-border cursor-pointer border-x-2 border-transparent text-primary-foreground/60 hover:text-primary-foreground",
                isActive && "text-primary-foreground border-l-white",
            )}
            onClick={onClick}
        >
            {icon}
        </div>
    );
};

interface MenuBarProps {
    active: string;
    onActiveChange?: (active: string) => void;
}

export default function MenuBar({ active, onActiveChange }: MenuBarProps) {
    return (
        <aside className="flex flex-col justify-between space-y-2 w-12 h-layout shadow bg-primary/50">
            <div className="flex flex-col">
                <MenuItem id="file" isActive={active === "file"} onClick={() => onActiveChange?.("file")} icon={<Files className="size-6" />} title="文件" />
                <MenuItem id="search" isActive={active === "search"} onClick={() => onActiveChange?.("search")} icon={<Search className="size-6" />} title="搜索" />
                <MenuItem id="copilot" isActive={active === "copilot"} onClick={() => onActiveChange?.("copilot")} icon={<Bot className="size-6" />} title="AI" />
            </div>
            <div className="flex flex-col justify-end flex-1">
                <MenuItem id="setting" onClick={() => { }} icon={<Settings className="size-6" />} title="设置" />
            </div>
        </aside>
    );
}