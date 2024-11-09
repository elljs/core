import { AnnotationHandler } from "codehike/code";

const calloutHandler: AnnotationHandler = {
	name: "callout",
	Block: ({ annotation, children }) => {
		const { character, className } = annotation.data;
		return (
			<>
				{children}
				<div
					style={{ minWidth: `${character + 4}ch` }}
					className={`w-fit border bg-zinc-900 border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces ${className}`}
				>
					<div
						style={{ left: `${character + 1}ch` }}
						className="absolute border-l border-t border-current w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-zinc-900"
					/>
					{annotation.query}
				</div>
			</>
		);
	},
};

export { calloutHandler };
