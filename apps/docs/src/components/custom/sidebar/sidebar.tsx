import { useHike } from "@hikestack/hooks";
import React from "react";
import { tv } from "tailwind-variants";
import { useTheme } from "../theme-provider";

export const SidebarContext = React.createContext<{
    open: boolean
    setOpen: (open: boolean) => void
}>({
    open: true,
    setOpen: () => { }
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const state = useHike({
        open: true
    });

    return (
        <SidebarContext.Provider
            value={{
                open: state.open,
                setOpen: (open: boolean) => {
                    state.open = open
                }
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
};

export const useSidebar = () => {
    const context = React.useContext(SidebarContext)

    if (context === undefined)
        throw new Error("useSidebar must be used within a SidebarProvider")

    return context
}

export interface SidebarProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> { }

export const Sidebar = ({ className, children }: SidebarProps) => {
    const { open } = useSidebar();

    return <aside className={tv({
        base: 'hidden lg:flex flex-col transition-all ease-in-out duration-300 border-r bg-sidebar',
        variants: {
            open: {
                true: 'w-64',
                false: 'w-14'
            }
        }
    })({
        open,
        className
    })}>{children}</aside>
};