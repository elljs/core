import { ApiReferenceReact, ReferenceProps } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { useTheme } from "../theme-provider";
import "./index.css";

export default function Scalar(props: ReferenceProps) {
    const { theme } = useTheme();

    return (
        <ApiReferenceReact
            configuration={{
                darkMode: theme === "dark",
                forceDarkModeState: theme === 'dark' ? "dark" : "light",
                defaultHttpClient: {
                    targetKey: "javascript",
                    clientKey: "axios",
                },
                spec: {
                    url: "https://cdn.jsdelivr.net/npm/@scalar/galaxy/dist/latest.yaml",
                },
            }}
            {...props}
        />
    );
}