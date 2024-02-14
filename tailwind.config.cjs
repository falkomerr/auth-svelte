import aspectRatio from '@tailwindcss/aspect-ratio';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

	plugins: [require('flowbite/plugin'), aspectRatio,
		addVariablesForColors],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#f2f5ff',
					100: '#eef2ff',
					200: '#dee1ff',
					300: '#ccd5ff',
					400: '#adc0ff',
					500: '#6d5dfe',
					600: '#652fef',
					700: '#5127eb',
					800: '#5222cc',
					900: '#3e1ba5'
				}
			}
		}
	}
};


function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		':root': newVars
	});
}

module.exports = config;