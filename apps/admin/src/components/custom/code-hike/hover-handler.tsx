import { AnnotationHandler, InnerLine } from "codehike/code";

const hoverHandler: AnnotationHandler = {
    name: "hover",
    onlyIfAnnotated: true,
    Line: ({ annotation, ...props }) => (
        <InnerLine
            merge={props}
            className="..."
            data-line={annotation?.query || ""}
        />
    ),
}

export { hoverHandler };