import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useReactive } from "ahooks";
import {
	AnnotationHandler,
	highlight,
	HighlightedCode,
	Pre,
} from "codehike/code";
import { useEffect } from "react";

const tooltipHandler: AnnotationHandler = {
	name: "tooltip",
	Inline: ({ children, annotation }) => {
		const state = useReactive<{
			highlighted: HighlightedCode | null;
		}>({
			highlighted: null,
		});

		useEffect(() => {
			const { query } = annotation;
			highlight({ value: query, lang: "ts", meta: "" }, "one-dark-pro").then(
				(highlighted) => {
					state.highlighted = highlighted;
				},
			);
		}, []);

		if (!state.highlighted) return <></>;

		return (
			<TooltipProvider delayDuration={300}>
				<Tooltip>
					<TooltipTrigger className="underline decoration-dashed cursor-pointer">
						{children}
					</TooltipTrigger>
					<TooltipContent className="bg-zinc-900" sideOffset={0}>
						<Pre code={state.highlighted} className="m-0 p-1 bg-transparent" />
						<TooltipArrow className="fill-zinc-800" />
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	},
};

export { tooltipHandler };
