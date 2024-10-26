import React from "react";
import { tv } from "tailwind-variants";
import { useSidebar } from "./sidebar";

export interface SidebarTriggerProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> { }

export const SidebarTrigger = ({ className }: SidebarTriggerProps) => {
    const { open, setOpen } = useSidebar();

    return <div className={tv({ base: 'relative w-5 h-5 cursor-pointer' })({ className })} onClick={() => setOpen(!open)}>
        <div className={`absolute left-0 w-5 h-[2px] transition ease-in-out duration-300 bg-foreground rounded origin-left ${open ? "rotate-0" : "rotate-45 translate-x-[3px] translate-y-[2px]"}`} />
        <div className={`absolute left-0 top-2 w-5 h-[2px] transition ease-in-out duration-300 bg-foreground rounded ${open ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute left-0 top-4 w-5 h-[2px] transition ease-in-out duration-300 bg-foreground rounded origin-left ${open ? "rotate-0" : "-rotate-45 translate-x-[3px] translate-y-[0px]"}`} />
    </div>
};