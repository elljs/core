import { tv } from "tailwind-variants";

export interface SidebarHeaderProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> { }

export const SidebarHeader = ({ className, children }: SidebarHeaderProps) => {
    return <div className={tv({
        base: 'transition-all ease-in-out duration-300 h-14 w-full flex items-center justify-between px-3 border-b border-sidebar-border hover:bg-sidebar-accent',
    })({
        className
    })
    }>
        {children}
    </div>;
};

