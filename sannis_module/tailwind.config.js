/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./static/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                "brand-green": "#00ff9d",

                // Terminal Component Colors (Inferred)
                "bg-base": "#000000",
                "bg-surface1": "#0A0A0A",
                "bg-surface2": "#121212",
                "bg-surface3": "#1A1A1A",

                "text-primary": "#FFFFFF",
                "text-secondary": "#A1A1AA", // zinc-400
                "text-tertiary": "#71717A", // zinc-500
                "text-disabled": "#52525B", // zinc-600

                "accent-green": "#00ff9d",
                "accent-red": "#ef4444", // red-500

                "neutral-700": "#3F3F46",
                "neutral-800": "#27272A",
                "neutral-825": "#1E1E20", // Custom
                "neutral-850": "#171717",

                "stroke-subtle": "rgba(255, 255, 255, 0.08)",
                "stroke-faint": "rgba(255, 255, 255, 0.04)",
                "stroke-strong": "rgba(255, 255, 255, 0.15)",

                "icon-primary": "#FFFFFF",
                "icon-secondary": "#A1A1AA",
                "icon-tertiary": "#71717A",

                // Alpha colors (approximations)
                "alpha-green-primary": "rgba(0, 255, 157, 0.2)",
                "alpha-green-secondary": "rgba(0, 255, 157, 0.1)",
                "alpha-green-tertiary": "rgba(0, 255, 157, 0.05)",

                "alpha-red-tertiary": "rgba(239, 68, 68, 0.05)",
                "alpha-neutral-secondary": "rgba(255, 255, 255, 0.1)",
                "alpha-neutral-tertiary": "rgba(255, 255, 255, 0.05)",
                "alpha-white-tertiary": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                '4': '4px',
                '6': '6px',
                '8': '8px',
            }
        },
    },
    plugins: [],
}
