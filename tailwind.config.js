/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
		},
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
				error: "#ff3900",
				primary: "#F5CB5C",
				primaryAlt: "#333533",
				secondary: "#CFDBD5",
				secondaryAlt: "#E8EDDF",
				primaryBlack: "#242423",
			},
			minWidth: {
				14: "3.5rem",
			},
		},
		fontFamily: {
			sans: ["Poppins", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
		keyframes: {
			wiggle: {
				"0%, 100%": { transform: "rotate(-3deg)" },
				"50%": { transform: "rotate(3deg)" },
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
