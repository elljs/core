import { cn } from "@/lib/utils";
import React from "react";

interface WidgetProps
	extends React.PropsWithChildren,
		React.HTMLAttributes<HTMLDivElement> {
	title: string;
	extra?: React.ReactNode;
}

export function Widget({ className, title, extra, children }: WidgetProps) {
	return (
		<div
			className={cn(
				"flex flex-col w-full h-full rounded-lg border bg-card text-card-foreground shadow-sm",
				className,
			)}
		>
			<div className="flex flex-row justify-between items-center w-full p-2">
				<div className="flex items-center before:content-[''] before:rounded-lg before:inline-block before:items-center before:bg-primary before:h-[18px] before:w-1 before:mr-1">
					{title}
				</div>
				<div className="mt-0">{extra}</div>
			</div>
			<div className="flex-1 px-2 pb-2">{children}</div>
		</div>
	);
}
