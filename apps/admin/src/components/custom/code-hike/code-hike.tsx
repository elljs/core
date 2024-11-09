import { useReactive } from "ahooks";
import { HighlightedCode, Pre, RawCode, highlight } from "codehike/code";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { calloutHandler } from "./callout-handler";
import { classNameHandler } from "./class-name-handler";
import { CopyButton } from "./copy-button";
import { lineNumbersHandler } from "./line-numbers-handler";
import { tooltipHandler } from "./tool-handler";
import { wordWrapHandler } from "./word-wrap-handler";

export function CodeHike({ codeblock }: { codeblock: RawCode }) {
	const state = useReactive<{
		highlighted: HighlightedCode | null;
	}>({
		highlighted: null,
	});

	useEffect(() => {
		highlight(codeblock, "one-dark-pro").then((highlighted) => {
			state.highlighted = highlighted;
		});
	}, [codeblock]);

	if (!state.highlighted)
		return (
			<div className="flex justify-center items-center bg-secondary p-10">
				<LoaderCircle className="animate-spin" />
			</div>
		);

	return (
		<div className="rounded bg-[var(--tw-prose-pre-bg)]">
			<div className="relative text-center text-sm pt-2 text-[var(--tw-prose-pre-code)]">
				{state.highlighted.meta}
				<CopyButton text={state.highlighted.code} />
			</div>
			<Pre
				className="mt-0"
				code={state.highlighted}
				handlers={[
					tooltipHandler,
					calloutHandler,
					classNameHandler,
					lineNumbersHandler,
					wordWrapHandler,
					tooltipHandler,
				]}
			/>
		</div>
	);
}
