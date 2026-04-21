import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHost: true,
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: [
      'zonegym-front.onrender.com',
      'all'
    ]
  }
});