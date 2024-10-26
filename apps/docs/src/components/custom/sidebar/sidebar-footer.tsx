import { tv } from "tailwind-variants";

export interface SidebarFooterProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> { }

export const SidebarFooter = ({ className, children }: SidebarFooterProps) => {
    return <div className={tv({
        base: 'transition-all ease-in-out duration-300 flex justify-between items-center h-14 w-full px-3 border-t border-sidebar-border hover:bg-sidebar-accent',
    })({
        className
    })
    }>
        {children}
    </div>;
};

