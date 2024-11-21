import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div className="flex space-x-2">
            <Link to="/admin">Admin</Link>
            <Link to="/docs">Docs</Link>
        </div>
    );
}