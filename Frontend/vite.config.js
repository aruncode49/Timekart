import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
