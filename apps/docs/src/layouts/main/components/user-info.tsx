import { useSidebar } from "@/components/custom/sidebar";
import { ChevronsUpDown } from "lucide-react";

const UserInfo = () => {
    const { open } = useSidebar();

    return <>
        <div className="flex items-center cursor-pointer">
            <img className="rounded-full h-8 w-8" alt="avatar" src="https://avatars.githubusercontent.com/u/19965768?v=4" />
            <div className={`flex-col space-y-1 ml-2 transition-all ease-in-out ${open ? 'delay-300' : 'opacity-0'}`}>
                <p className="text-sm text-sidebar-primary-foreground font-medium">Roy Lin</p>
                <p className="text-xs text-sidebar-accent-foreground">18770221825@163.com</p>
            </div>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-white cursor-pointer" />
    </>
}

export default UserInfo;