import { useTheme } from "./theme-provider";

export function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="flex flex-1 items-center">

        </nav>
    );
}