export default function Link(props: { href?: string; children?: React.ReactNode }) {
    if (props.href?.startsWith("hover:")) {
        const hover = props.href.slice("hover:".length)
        return (
            <span
                className="..."
                data-hover={hover}
            >
                {props.children}
            </span>
        )
    } else {
        return <a {...props} />
    }
}