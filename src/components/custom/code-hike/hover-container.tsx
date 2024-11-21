export default function HoverContainer(props: { children: React.ReactNode }) {
    return <div className="hover-container bg-red-500">{props.children}</div>
}