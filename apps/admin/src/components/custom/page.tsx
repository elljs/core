import { cn } from "@/lib/utils";
import React from "react";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement>, React.PropsWithChildren { }

const PageHeader = ({ className, children }: PageHeaderProps) => {
    return (
        <div className={cn("flex justify-between items-center", className)}>
            <h1 className="text-xl font-bold">
                {children}
            </h1>
        </div>
    )
};

interface PageProps extends React.HTMLAttributes<HTMLDivElement>, React.PropsWithChildren {
    header?: React.ReactNode;
    extra?: React.ReactNode;
}

const Page = ({ header, extra = <div />, className, children }: PageProps) => {
    return (
        <div className={cn("p-3", className)}>
            <div className="flex justify-between items-center">
                <PageHeader>{header}</PageHeader>
                {extra}
            </div>
            {children}
        </div>
    );
};

Page.displayName = "Page";

export {
    Page,
    PageHeader
};