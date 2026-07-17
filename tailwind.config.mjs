/** @type {import('tailwindcss').Config} */
export default {
    // Aquí le decimos a Tailwind en qué carpetas buscar tu código de diseño
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    from: { transform: 'translateX(0%)' },
                    to: { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 30s linear infinite',
            },
        },
    },
    plugins: [],
}