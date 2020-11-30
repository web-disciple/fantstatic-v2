import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

// `npm run watch:js` -> `production` is true
// `npm run build:js` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default [
	//main.js call on all pages
	{
		input: '_dev/js/main.js',
		output: {
			file: production ? 'public/js/main.js' : 'dist/js/main.js',
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			sourcemap: !production
		},
		plugins: [
			resolve(), // tells Rollup how to find date-fns in node_modules
			commonjs(), // converts date-fns to ES modules
			production && terser() // minify, but only in production
		]
	},
	// specifics scripts
	{
		input: '_dev/js/pages/homepage.js',
		output: {
			file: production ? 'public/js/pages/homepage.js' : 'dist/js/pages/homepage.js',
			format: 'iife',
			sourcemap: !production
		},
		plugins: [
			resolve(),
			commonjs(),
			production && terser()
		]
	}
];