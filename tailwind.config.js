/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				violet: "#7E33E0",
				pink: "#FB2E86",
				"highlight-dark-blue": "#1D3178",
				"dark-blue": "#0D0E43",
				"violet-light": "#F2F0FF",
				"violet-subtext": "#8A8FB9",
				"card-highlight": "#2F1AC4",
				page: "#151875",
				success: "#19D16F",
			},
		},
		fontFamily: {
			sans: ["Josefin Sans", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
	},
	plugins: [],
};

