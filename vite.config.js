import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
	cloudflare({ viteEnvironment: { name: "ssr" } }),
    reactRouter(),
	eslint({})
  ],
//   define: {
// 	"global": "window"
//   },
});
