// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter: adapter(),

		adapter: adapter({
			edge: false,
			split: false
		}),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		prerender: {
			crawl: true,
			enabled: true,
			entries: ['*'],
		},
	},

	preprocess: preprocess(),
};

export default config;
