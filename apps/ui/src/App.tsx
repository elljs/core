import Test from "./test.mdx";
import {
	AnnotationHandler,
	InnerLine,
	BlockAnnotation,
	HighlightedCode,
	Pre,
} from "codehike/code";

import { Button } from "@/components/button";
import { Card } from "@/components/card";

const mark: AnnotationHandler = {
	name: "mark",
	Line: ({ annotation, ...props }) => {
		const color = annotation?.query || "rgb(14 165 233)";
		return (
			<div
				className="..."
				style={{
					borderLeft: "solid 2px transparent",
					borderLeftColor: annotation && color,
					backgroundColor: annotation && `rgb(from ${color} r g b / 0.1)`,
				}}
			>
				<InnerLine merge={props} className="..." />
			</div>
		);
	},
	Inline: ({ annotation, children }) => {
		const color = annotation?.query || "rgb(14 165 233)";
		return (
			<span
				className="..."
				style={{
					outline: `solid 1px rgb(from ${color} r g b / 0.5)`,
					background: `rgb(from ${color} r g b / 0.13)`,
				}}
			>
				{children}
			</span>
		);
	},
};

export const diff: AnnotationHandler = {
	name: "diff",
	onlyIfAnnotated: true,
	transform: (annotation: BlockAnnotation) => {
		const color = annotation.query === "-" ? "#f85149" : "#3fb950";
		return [annotation, { ...annotation, name: "mark", query: color }];
	},
	Line: ({ annotation, ...props }) => (
		<>
			<div className="...">{annotation?.query}</div>
			<InnerLine merge={props} />
		</>
	),
};

function Code({ codeblock }: { codeblock: HighlightedCode }) {
	return (
		<div>
			<a>复制</a>
			<Pre code={codeblock} handlers={[mark, diff]} />
		</div>
	);
}

const App = () => {
	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold underline text-red-500">
				Hello world!
			</h1>
			<Card className="flex space-x-2 p-4">
				<Button>Primary</Button>
				<Button isDisabled>isDisabled</Button>
				<Button isLoading>isLoading</Button>
			</Card>
			<Card className="flex space-x-2 p-4">
				<Button>Primary</Button>
				<Button styles={{ variant: "secondary" }}>Secondary</Button>
				<Button styles={{ variant: "destructive" }}>Destructive</Button>
				<Button styles={{ variant: "ghost" }}>Ghost</Button>
				<Button styles={{ variant: "outline" }}>Outline</Button>
				<Button styles={{ variant: "link" }}>Link</Button>
			</Card>
			<Card className="flex space-x-2 p-4">
				<Button styles={{ size: "sm" }}>Primary</Button>
				<Button styles={{ variant: "secondary", size: "sm" }}>Secondary</Button>
				<Button styles={{ variant: "destructive", size: "sm" }}>Destructive</Button>
				<Button styles={{ variant: "ghost", size: "sm" }}>Ghost</Button>
				<Button styles={{ variant: "outline", size: "sm" }}>Outline</Button>
				<Button styles={{ variant: "link", size: "sm" }}>Link</Button>
			</Card>
			<Card className="flex space-x-2 p-4">
				<Button styles={{ size: "lg" }}>Primary</Button>
				<Button styles={{ variant: "secondary", size: "lg" }}>Secondary</Button>
				<Button styles={{ variant: "destructive", size: "lg" }}>Destructive</Button>
				<Button styles={{ variant: "ghost", size: "lg" }}>Ghost</Button>
				<Button styles={{ variant: "outline", size: "lg" }}>Outline</Button>
				<Button styles={{ variant: "link", size: "lg" }}>Link</Button>
			</Card>
			<Card className="flex space-x-2 p-4">
				<Button styles={{ size: "icon" }}>Primary</Button>
				<Button styles={{ variant: "secondary", size: "icon" }}>Secondary</Button>
				<Button styles={{ variant: "destructive", size: "icon" }}>Destructive</Button>
				<Button styles={{ variant: "ghost", size: "icon" }}>Ghost</Button>
				<Button styles={{ variant: "outline", size: "icon" }}>Outline</Button>
				<Button styles={{ variant: "link", size: "icon" }}>Link</Button>
			</Card>
			<Test components={{ Code }} />
		</div>
	);
};

export default App;
