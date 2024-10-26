import React from "react";
import { tv } from "tailwind-variants";
import { useSidebar } from "./sidebar";

export interface SidebarGroupProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
    label: React.ReactNode;
}

const sidebarGroupVariants = tv({
    slots: {
        base: 'flex flex-col w-full py-3 transition-all ease-in-out delay-300',
        labelContainer: 'flex justify-center items-center w-full h-5 mb-3',
        label: 'w-full py-3 px-6 text-xs font-bold text-sidebar-accent-foreground opacity-50 tracking-wide uppercase cursor-default',
    },
    variants: {
        open: {
            true: {
                base: 'items-start',
            },
            false: {
                base: 'items-center',
                label: 'inline-block border border-muted-foreground rounded-full h-2 w-2 opacity-100 p-0'
            }
        }
    }
});

export const SidebarGroup = ({ className, children, label }: SidebarGroupProps) => {
    const { open } = useSidebar();
    const { base, labelContainer, label: labelSlot } = sidebarGroupVariants({ open, className });

    return <div className={base()}>
        <div className={labelContainer()}>
            <div className={labelSlot()}>
                {open ? label : ''}
            </div>
        </div>
        {children}
    </div>;
};
