import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    port: 3000, // specify the port you want to use
  },
  css: {
    modules: {
      scopeBehaviour: "local", // Default is 'local' which should work fine
    },
  },
});
