module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif']
		},
		extend: {
			backgroundImage: {
				'flutter-pattern': "url('flutter.svg')",
				'flutter-light': "url('flutter-light.svg')"
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
