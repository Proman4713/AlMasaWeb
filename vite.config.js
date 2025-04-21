import { reactRouter } from "@react-router/dev/vite";
import eslint from 'vite-plugin-eslint';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), eslint({})],
});
