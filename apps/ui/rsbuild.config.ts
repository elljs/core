import path from "path";
import { defineConfig } from "@rsbuild/core";
import { pluginMdx } from "@rsbuild/plugin-mdx";
import { pluginReact } from "@rsbuild/plugin-react";
import { recmaCodeHike, remarkCodeHike } from "codehike/mdx";

const chConfig = {
	components: { code: "Code" },
	syntaxHighlighting: {
		theme: "one-dark-pro",
	},
};

export default defineConfig({
	html: {
		template: path.join(__dirname, "index.html"),
	},
	source: {
		alias: {
			"@/": path.join(__dirname, "src"),
		},
	},
	output: {
		distPath: {
			root: "dist",
		},
	},
	server: {
		host: "0.0.0.0",
		port: 8888,
		proxy: {
			"/api": {
				target: process.env.PUBLIC_API_URL,
				changeOrigin: true,
			},
		},
		open: false,
	},
	plugins: [
		pluginMdx({
			mdxLoaderOptions: {
				remarkPlugins: [[remarkCodeHike, chConfig]],
				recmaPlugins: [[recmaCodeHike, chConfig]],
				jsx: true,
			},
		}),
		pluginReact(),
	],
});
