import { tv } from "tailwind-variants";

export interface SidebarContentProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> { }

export const SidebarContent = ({ className, children }: SidebarContentProps) => {
    return <div className={tv({
        base: 'transition-all ease-in-out duration-300 flex flex-1 flex-col overflow-y-hidden',
    })({
        className
    })}>
        <div className="overflow-y-auto scrollbar-none">
            {children}
        </div>
    </div>;
};