/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./pages/**/*.html", "./js/**/*.js"],
    theme: {
        extend: {
            colors: {
                "primary-navy": "#15264b",
                "secondary-navy": "#2d4a6b",
                "light-navy": "#4a6b8a",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
