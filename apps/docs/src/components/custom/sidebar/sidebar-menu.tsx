import { ChevronRight } from "lucide-react";
import { ClassValue, tv } from "tailwind-variants";
import { useSidebar } from "./sidebar";

const sidebarMenuItemVariants = tv({
    slots: {
        base: 'w-full py-2 flex justify-center items-center rounded-lg hover:bg-sidebar-primary text-sm font-medium text-sidebar-primary-foreground data-[active="true"]:bg-sidebar-accent data-[active="true"]:text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent',
        content: 'flex justify-between items-center transition-all ease-in-out',
        arrow: 'w-4 h-4'
    },
    variants: {
        open: {
            true: {
                base: 'pl-3 pr-1',
                content: 'flex-1 opacity-100 ml-2',
            },
            false: {
                base: 'pl-0 pr-0',
                content: 'flex-none opacity-0 ml-0',
            }
        }
    }
});

export interface SidebarMenuItemProps {
    className?: ClassValue;
    icon?: React.ReactNode;
    label?: React.ReactNode;
}

export const SidebarMenuItem = ({ className, icon, label }: SidebarMenuItemProps) => {
    const { open } = useSidebar();
    const { base, content, arrow } = sidebarMenuItemVariants({ className, open });

    return <li className={base()}>
        {icon}
        <div className={content()}>
            {open && <>{label} <ChevronRight className={arrow()} /></>}
        </div>
    </li>;
}

const sidebarMenuVariants = tv({
    base: 'flex flex-col space-y-1 justify-between items-center w-full px-3 cursor-pointer',
});

export interface SidebarMenuProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLUListElement> { }

export const SidebarMenu = ({ className, children }: SidebarMenuProps) => {
    return <ul className={sidebarMenuVariants({ className })}>
        {children}
    </ul>
};