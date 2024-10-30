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
		port: 8888
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
	]
});
