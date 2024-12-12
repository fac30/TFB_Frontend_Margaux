import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
            manifest: {
                name: "Inside My Closet",
                short_name: "MyCloset",
                description: "Your digital wardrobe management platform",
                theme_color: "#EC5E29",
                background_color: "#ffffff",
                display: "standalone",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "react-native": "react-native-web",
            "react-native-svg": "react-native-svg-web",
            "@react-native-aria/interactions": "@react-aria/interactions",
        },
    },
    optimizeDeps: {
        include: ["react-native-web"],
    },
    define: {
        __DEV__: JSON.stringify(true),
        Platform: JSON.stringify({ OS: 'web' })
    },
    server: {
        host: '0.0.0.0',
        port: 5174
    }
});
