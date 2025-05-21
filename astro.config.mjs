
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    integrations: [svelte()],
    adapter: node({ mode: 'standalone' }),
    output: 'server',
    vite: {
        plugins: [tailwindcss()],
    },
    server: {
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
    },
});
