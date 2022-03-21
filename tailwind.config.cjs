module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
			mono: ['JetBrains Mono', 'ui-monospaced', 'monospaced']
    },
    extend: {
      backgroundImage: {
        'flutter-pattern': "url('/flutter.svg')",
        'flutter-light': "url('/flutter-light.svg')",
      },
			colors: {
				'mean-green': '#00853E'
			}
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
